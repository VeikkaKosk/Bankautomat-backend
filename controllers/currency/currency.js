//Currency moduli hakee valuuttakurssin API:sta ja palauttaa sen. Jos valuuttakurssia ei löydy, saadaan virhe.
// Jotta Free planin kutsujen määrä ei ylittysi, varmaan hyvä toteuttaa jokin cache(välimuisti), 
// jota päivitetään esim kerran päivässä

const axios = require('axios');
// API URL viedään myöhemmin env-tiedostoon ja otetaan sieltä käyttöön.
const API_URL = 'https://api.exchangerate-api.com/v4/latest/';

async function getCurrencyRate(baseCurrency, targetCurrency) {
    try {
        const response = await axios.get(`${API_URL}${baseCurrency}`);
        const rates = response.data.rates;
        const rate = rates[targetCurrency];

        if (!rate) {
            throw new Error(`Rate for ${targetCurrency} not found`);
        }

        return rate;
    } catch (error) {
        console.error('Error fetching currency rate:', error);
        throw error;
    }
}

module.exports = {
    getCurrencyRate
};