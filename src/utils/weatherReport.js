const axios = require('axios');

const weatherReport = (latitude, longitude, callback) => {
    axios.get('http://api.weatherapi.com/v1/current.json', {
        params: {
            key: '1eb7c1b148cc4e6eb21131319211902',
            q: `${latitude},${longitude}`
        }
    })
    .then(response => {
        callback(undefined, `Condition: ${response.data.current.condition.text}. Temperature: ${response.data.current.temp_c} degree celcius.`);
    })
    .catch(err => {
        callback('Unable to connect Geocode API', undefined);
    });
}

module.exports = weatherReport;