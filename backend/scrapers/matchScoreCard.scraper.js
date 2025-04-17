const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
puppeteer.use(StealthPlugin());

const matchScoreCardScraper = async (id, module = 'batter', teamCode = '') => {
  const browser = await puppeteer.launch({
    headless: true,
    executablePath: '/usr/bin/google-chrome-stable',
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-gpu',
      '--disable-software-rasterizer',
      '--window-size=1280x800',
    ],
  });

  const page = await browser.newPage();
  page.on('console', msg => console.log('PAGE LOG:', msg.text()));

  await page.setUserAgent(
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36'
  );

  await page.setExtraHTTPHeaders({
    'Accept-Language': 'en-US,en;q=0.9',
  });

  const url = `https://www.iplt20.com/match/2025/${id}`;
  await page.goto(url, { waitUntil: 'networkidle2' });

  // Optional tab click (PBKS or similar)
  if (teamCode) {
    await page.waitForSelector('.ap-inner-tb-click', { timeout: 10000 });
    await page.evaluate((teamCode) => {
      const tabs = Array.from(document.querySelectorAll('.ap-inner-tb-click'));
      const teamTab = tabs.find(tab => tab.textContent.includes(teamCode));
      if (teamTab) teamTab.click();
    }, teamCode);
    await new Promise(resolve => setTimeout(resolve, 2000));
  }

  await page.waitForSelector('#scoreCard', { timeout: 10000 });

  const data = await page.evaluate((module) => {
    const getBowlerData = () => {
      const bowlerSection = document.querySelector('.sc-bow-card');
      const bowler = [];
      if (bowlerSection) {
        const rows = bowlerSection.querySelectorAll('tbody.team1 tr');
        rows.forEach(row => {
          const playerImage = row.querySelector('img')?.src || '';
          const playerName = row.querySelector('.ap-bats-score-name span')?.textContent.trim() || '';
          const cells = row.querySelectorAll('td');
          bowler.push({
            playerImage,
            playerName,
            overs: cells[2]?.textContent.trim() || '',
            maidens: cells[3]?.textContent.trim() || '',
            runsConceded: cells[4]?.textContent.trim() || '',
            wickets: cells[5]?.textContent.trim() || '',
            economy: cells[6]?.textContent.trim() || '',
            dots: cells[7]?.textContent.trim() || ''
          });
        });
      }
      return bowler;
    };

    const getBatterData = () => {
      const betterSection = document.querySelector('.ap-scorecard-outer');
      const batter = [];
      if (betterSection) {
        const rows = betterSection.querySelectorAll('tbody.team1 tr');
        rows.forEach(row => {
          const playerImage = row.querySelector('img')?.src || '';
          const playerName = row.querySelector('.ap-bats-score-name span')?.textContent.trim() || '';
          const cells = row.querySelectorAll('td');
          batter.push({
            playerImage,
            playerName,
            runs: cells[2]?.textContent.trim() || '',
            balls: cells[3]?.textContent.trim() || '',
            fours: cells[4]?.textContent.trim() || '',
            sixes: cells[5]?.textContent.trim() || '',
            strikeRate: cells[6]?.textContent.trim() || '',
          });
        });
      }
      return batter;
    };

    const getTeamPlayers = () => {
      const section = document.querySelector('#fixtureSquad-block');
      const players = [];
      if (section) {
        const items = section.querySelectorAll('.fixtureSquad-item');
        items.forEach(player => {
          const playerImage = player.querySelector('img')?.src || '';
          const playerName = player.querySelector('.fx-ply-name a')?.textContent.trim() || '';
          const playerProfileLink = player.querySelector('.fx-ply-name a')?.href || '';
          const playerSkill = player.querySelector('.fx-ply-prf')?.textContent.trim() || '';
          const isCaptain = !!player.querySelector('.sq-cp');
          const isWicketKeeper = !!player.querySelector('.sq-wk');
          const isOverseas = !!player.querySelector('.p11-fb');
          players.push({
            playerImage,
            playerName,
            playerProfileLink,
            playerSkill,
            isCaptain,
            isWicketKeeper,
            isOverseas
          });
        });
      }
      return players;
    };

    switch (module) {
      case 'bowler':
        return getBowlerData();
      case 'teamplayers':
        return getTeamPlayers();
      case 'batter':
      default:
        return getBatterData();
    }
  }, module); // 👈 pass module here

  await browser.close();
  return { data };
};

module.exports = { matchScoreCardScraper };
