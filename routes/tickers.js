const express = require('express');
const router = express.Router();
const axios = require('axios');
const Ticker = require('../models/ticker');

// Fetch data from the WazirX API and store in MongoDB
router.get('/fetch-tickers', async (req, res) => {
  try {
    const response = await axios.get('https://api.wazirx.com/api/v2/tickers');
    const tickersData = response.data;
    
    await Ticker.deleteMany({}); // Clear existing data

    const top10Tickers = Object.values(tickersData).slice(0, 10).map(ticker => ({
      name: ticker.name,
      last: ticker.last,
      buy: ticker.buy,
      sell: ticker.sell,
      volume: ticker.volume,
      base_unit: ticker.base_unit,
    }));

    await Ticker.insertMany(top10Tickers);

    res.status(200).json({ message: 'Top 10 tickers fetched and stored successfully!', data: top10Tickers });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching or storing data' });
  }
});

// Get stored data from MongoDB
router.get('/get-tickers', async (req, res) => {
  try {
    const tickers = await Ticker.find({});
    res.status(200).json(tickers);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching data' });
  }
});

module.exports = router;
