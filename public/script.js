document.addEventListener('DOMContentLoaded', async () => {
    try {
        const response = await fetch('/get-tickers');
        const tickers = await response.json();
        
        const tableBody = document.querySelector('#ticker-table tbody');
        tableBody.innerHTML = '';

        tickers.forEach(ticker => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${ticker.name}</td>
                <td>${ticker.last}</td>
                <td>${ticker.buy}</td>
                <td>${ticker.sell}</td>
                <td>${ticker.volume}</td>
                <td>${ticker.base_unit}</td>
            `;
            tableBody.appendChild(row);
        });
    } catch (error) {
        console.error('Error fetching tickers:', error);
    }
});
