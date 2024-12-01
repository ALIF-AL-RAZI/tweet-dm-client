const axios = require('axios').default;

const options = {
    method: 'GET',
    url: 'https://quotelibapi.p.rapidapi.com/quote/',
    headers: {
        'x-rapidapi-host': 'quotelibapi.p.rapidapi.com',
        'x-rapidapi-key': '0ec7a58dffmsh27b4705480b0f27p190b06jsn783a9bb2c00f'
    }
};

const getQuote = () => axios.request(options);

export default getQuote;
