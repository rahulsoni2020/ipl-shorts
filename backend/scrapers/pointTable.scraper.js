const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
puppeteer.use(StealthPlugin());

const scrapePointsTable = async (year = '2025', type = 'men') => {
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

  await page.setUserAgent(
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36'
  );

  await page.setExtraHTTPHeaders({
    'Accept-Language': 'en-US,en;q=0.9',
  });

  await page.goto(`https://www.iplt20.com/points-table/${type}/${year}`, { waitUntil: 'networkidle2' });

  await page.evaluate(() => {
    const tabs = Array.from(document.querySelectorAll('.cSBListItems'));
    const womenTab = tabs?.find(tab => tab?.textContent?.includes('WOMEN'));
    if (womenTab) womenTab.click();
  });

  const keyMapping = {
    'POS': 'pos',
    'TEAM': 'team',
    'P': 'played',
    'W': 'won',
    'L': 'lost',
    'NR': 'noResult',
    'NRR': 'netRunRate',
    'FOR': 'for',
    'AGAINST': 'against',
    'PTS': 'points',
    'RECENT FORM': 'recentForm',
  };

  const [headers, filters, tableData] = await page.evaluate((keyMapping) => {
    const headerElements = Array.from(document.querySelectorAll('.points-table-page tr th'));
    const headers = headerElements.map(header => header.innerText.trim());

    const filterElements = Array.from(document.querySelectorAll('.cSBListItems'));
    const filters = filterElements
      .map(el => el.textContent.trim())
      .filter(text => text.toLowerCase().includes('season'))
      .map(text => text.replace('SEASON ', '')); // Remove 'Season ' prefix

    const headerObjects = headers
      .filter(header => header !== '')
      .map(header => ({
        key: keyMapping[header] || header.toLowerCase(),
        title: header,
      }));

    const rows = Array.from(document.querySelectorAll('.points-table-page tr'));
    const tableData = rows.map(row => {
      const cells = row.querySelectorAll('td');
      if (cells.length) {
        const rowData = {};
        headers.forEach((header, index) => {
          if (header === '') return; // Skip empty headers
          const key = keyMapping[header] || header.toLowerCase();
          const cell = cells[index];
          if (key === 'team') {
            const image = cell.querySelector('img')?.src || '';
            const name = cell.innerText.trim();
            rowData[key] = { image, name };
          } else if (key === 'recentForm') {
            const nestedElements = Array.from(cell.querySelectorAll('span'));
            rowData[key] = nestedElements.map(el => ({ text: el.innerText.trim() }));
          } else {
            rowData[key] = cell.innerText.trim();
          }
        });
        return rowData;
      }
    }).filter(row => row);

    return [headerObjects, filters, tableData];
  }, keyMapping);

  await browser.close();

  return {
    filters,
    headers,
    data: tableData,
  };
};

module.exports = { scrapePointsTable };
