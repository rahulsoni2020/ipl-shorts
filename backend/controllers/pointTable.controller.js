const { scrapePointsTable } = require("../scrapers/pointTable.scraper");

const pointTableController = async (req, res) => {
    try {
        const {season , type } = req.params;
        const data = await scrapePointsTable(season, type);
        res.status(200).json(data);
      } catch (error) {
        res.status(500).json({ error: 'Failed to scrape sports news', details: error.message });
      }
}

module.exports = {pointTableController};