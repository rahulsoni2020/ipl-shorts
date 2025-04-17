const { matchesScraper } = require("../scrapers/matches.scraper");
const { matchScoreCardScraper } = require("../scrapers/matchScoreCard.scraper");

const upcomingMatchesController = async (req, res) => {
    try {
      console.log('getting upcoming match data');
        const data = await matchesScraper(false);
        console.log(data);
        res.status(200).json(data);
      } catch (error) {
        res.status(500).json({ error: 'Failed to scrape Match Details', details: error.message });
      }
}

const pastMatchesController = async (req, res) => {
    try {
        const data = await matchesScraper(true);
        res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ error: 'Failed to scrape Match Details', details: error.message });
    }
}

const getMatchInfo = async (req, res) => {
  try {
    const { id, module = 'batter', teamCode } = req.params;
    const data = await matchScoreCardScraper(id, module, teamCode);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to scrape Match Score Card', details: error.message });
  }
}

const getMatchDetails = async (req, res) => {
  try {
    const { id,type} = req.params;
    const data = await matchesScraper(type === 'past');
    const match = data.data.find((match) => match.id === id);
    if (!match) {
      return res.status(404).json({ error: 'Match not found' });
    }
    res.status(200).json(match);
  } catch (error) {
    res.status(500).json({ error: 'Failed to scrape Match Details', details: error.message });
  }
}

module.exports = {upcomingMatchesController, pastMatchesController, getMatchInfo, getMatchDetails};