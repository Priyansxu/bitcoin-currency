const axios = require('axios');

/**
 * Fetch real-time Bitcoin price from CoinGecko API.
 * 
 * @param {string} currency - The fiat currency for the Bitcoin rate (default: 'usd').
 * @returns {Promise<number>} - A promise that resolves to the Bitcoin rate.
 * @throws {Error} - Throws an error if the API request fails or data is invalid.
 */
async function getBitcoinRate(currency = 'usd') {
    const apiUrl = `https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=${currency}`;

    try {
        const response = await axios.get(apiUrl);

        // Validate response structure
        if (!response.data || !response.data.bitcoin || typeof response.data.bitcoin[currency] !== 'number') {
            throw new Error('Unexpected API response structure');
        }

        return response.data.bitcoin[currency];
    } catch (error) {
        // Handle specific Axios errors
        if (error.response) {
            throw new Error(`API Error: ${error.response.status} - ${error.response.statusText}`);
        } else if (error.request) {
            throw new Error('No response received from API');
        } else {
            throw new Error(`Request Error: ${error.message}`);
        }
    }
}

module.exports = getBitcoinRate;
