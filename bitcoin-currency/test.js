const getBitcoinRate = require('./index');

(async () => {
    try {
        const rate = await getBitcoinRate('usd'); // Replace 'usd' with any fiat currency code
        console.log(`Bitcoin rate in USD: $${rate}`);
    } catch (error) {
        console.error(error.message);
    }
})();
