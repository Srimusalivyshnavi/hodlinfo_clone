const express = require('express');
const mongoose = require('mongoose');
const axios = require('axios');
const path = require('path');
require('dotenv').config();

const app = express();

// MongoDB connection
const mongoURI = process.env.MONGODB_URI;
if (!mongoURI) {
    console.error('MongoDB URI is not defined in the .env file.');
    process.exit(1); // Exit the process if URI is not defined
}

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));


const tickerSchema = new mongoose.Schema({
    name: String,
    last: Number,
    buy: Number,
    sell: Number,
    volume: Number,
    base_unit: String
});
const Ticker = mongoose.model('Ticker', tickerSchema);

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// Route to fetch and store tickers
app.get('/fetch-tickers', async (req, res) => {
    try {
        const response = await axios.get('https://api.wazirx.com/api/v2/tickers');
        const tickersData = response.data;
        const top10Tickers = Object.values(tickersData)
            .slice(0, 10)
            .map(ticker => ({
                name: ticker.name,
                last: ticker.last,
                buy: ticker.buy,
                sell: ticker.sell,
                volume: ticker.volume,
                base_unit: ticker.base_unit,
            }));
        await Ticker.deleteMany({});
        await Ticker.insertMany(top10Tickers);
        res.status(200).json({ message: 'Top 10 tickers fetched and stored successfully!' });
    } catch (error) {
        console.error('Error fetching or storing data:', error);
        res.status(500).json({ message: 'Error fetching or storing data' });
    }
});

// Route to get stored tickers
app.get('/get-tickers', async (req, res) => {
    try {
        const tickers = await Ticker.find({});
        res.status(200).json(tickers);
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ message: 'Error fetching data' });
    }
});


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

