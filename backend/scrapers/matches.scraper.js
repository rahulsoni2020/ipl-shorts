const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
puppeteer.use(StealthPlugin());

const matchesScraper = async (isPastMatches = false) => {
  const browser = await puppeteer.launch({
    headless: true,
    executablePath: '/usr/bin/google-chrome-stable',
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-gpu',
      '--disable-software-rasterizer',
      '--window-size=1500x860',
      '--disable-dev-shm-usage' 
    ],
  });

  const page = await browser.newPage();

  await page.setUserAgent(
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36'
  );

  await page.setExtraHTTPHeaders({
    'Accept-Language': 'en-US,en;q=0.9',
  });
  page.on('console', msg => console.log('PAGE LOG:', msg.text()));

  await page.goto(`https://www.iplt20.com/matches/${isPastMatches ? 'results': 'fixtures'}`, { waitUntil: 'networkidle2' });

  await page.waitForSelector('.vn-sheduleList',{ timeout: 10000 });
  await new Promise(resolve => setTimeout(resolve, 1000));

  const matchData = await page.evaluate(() => {
    const matchBlocks = Array.from(document.querySelectorAll('#team_archive li'));
    return matchBlocks.map(block => {
      const extractText = selector => block.querySelector(selector)?.textContent.trim() || '';
      const extractAttr = (selector, attr) => block.querySelector(selector)?.getAttribute(attr) || '';
  
      const venueElement = block.querySelector('.vn-venueDet span');
      const cityElement = block.querySelector('.vn-venueDet p');
  
      const venue = venueElement ? venueElement.textContent.trim() : '';
      let city = cityElement ? cityElement.textContent.trim() : '';
      if (venue) {
        city = city.replace(venue, '').trim();
      }
  
      const rawDate = extractText('.vn-matchDate');
      const rawTime = extractText('.vn-matchTime');
      const fallbackDateTime = rawDate && rawTime ? `${rawDate}, ${rawTime}` : '';
      const matchDateTime = extractText('.vn-matchDateTime') || fallbackDateTime;
  
      const status = extractText('.vn-ticketTitle');
  
      const matchUrl = extractAttr('.vn-matchBtn', 'href');
      const matchId = matchUrl.split('/').pop();
      const match = {
        matchNumber: extractText('.vn-matchOrder'),
        venue,
        city,
        matchDate: rawDate,
        matchTime: rawTime,
        matchDateTime,
        status,
        isLive: !!block.querySelector('.livematchIcon'),
        matchUrl,
        id: matchId,
        teams: [],
      };
  
      const teamBlocks = block.querySelectorAll('.vn-shedTeam, .vn-team-2');
      teamBlocks.forEach(team => {
        const teamData = {};
        const logoEl = team.querySelector('img');
        const nameEl = team.querySelector('h3');
        const codeEl = team.querySelectorAll('h3')[1];
        const scoreEl = team.querySelector('p');
        const overEl = team.querySelector('.ov-display');
        if (logoEl) teamData.logo = logoEl.src;
        if (nameEl) teamData.name = nameEl.textContent.trim();
        if (codeEl) teamData.code = codeEl.textContent.trim();
        if (scoreEl) teamData.score = scoreEl.textContent.trim();
        if (overEl) teamData.overs = overEl.textContent.trim();
        if (teamData.name && status.toLowerCase().includes(teamData.name.toLowerCase())) {
          teamData.winner = true;
        } else {
          teamData.winner = false;
        }
  
        match.teams.push(teamData);
      });
  
      return match;
    });
  });

  await browser.close();
  return {
    data: matchData,
  };
};

module.exports = { matchesScraper };
