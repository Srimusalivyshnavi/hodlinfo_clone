##Cryptocurrency Ticker Dashboard


This project is a simple cryptocurrency ticker dashboard that fetches the top 10 cryptocurrency data from the WazirX API, stores it in a MongoDB database, and displays the data on a web page. It is built using Node.js, Express, MongoDB, and vanilla HTML/CSS/JavaScript.

Features:
Fetches live cryptocurrency data (name, last price, buy/sell rates, volume, and base unit) from the WazirX API.
Stores the top 10 cryptocurrencies in a MongoDB database.
Displays the stored data on a simple webpage.
Includes a button to manually refresh the cryptocurrency data.
Technologies Used:
Node.js: Handles the backend logic and API requests.
Express: Framework for building server-side routes.
MongoDB: Database to store the cryptocurrency data.
Mongoose: ODM for connecting and interacting with MongoDB.
Axios: Used for making HTTP requests to the WazirX API.
HTML/CSS: For building the front-end interface.


How It Works:
The /fetch-tickers endpoint fetches the top 10 cryptocurrency data from the WazirX API and stores it in MongoDB.
The /get-tickers endpoint retrieves the stored data from the database and serves it to the frontend.
The user interface displays the cryptocurrency data in a table format.
