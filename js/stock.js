function getStockPrice() {
    const symbol = document.getElementById("stock-symbol").value;
    const apiKey = 'YOUR_API_KEY'; // Alpha Vantage API Key
    const url = https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=5min&apikey=${apiKey};

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const timeSeries = data['Time Series (5min)'];
            const latestTime = Object.keys(timeSeries)[0];
            const latestData = timeSeries[latestTime];
            const price = latestData['1. open'];

            document.getElementById("stock-info").innerHTML = Price of ${symbol}: $${price};
        })
        .catch(err => {
            console.error('Error fetching stock data:', err);
        });
}
