const axios = require('axios');

const geoCode = (address, callback) => {
    axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json`, {
        params: {
            access_token: 'pk.eyJ1IjoicnpzaGlwbHVyZWFjdCIsImEiOiJja2xjZWZncXcxaDBiMnhuMG04ZWxvMzBpIn0.KdRc36sLlL5wAISaUsZbjw'
        }
    })
    .then(response => {
        const featuresArray = response.data.features;

        if(featuresArray.length === 0){
            callback('Could not found any Location.', undefined);
        } else{
            callback(undefined, {
                place_name: featuresArray[0].place_name,
                longitude: featuresArray[0].center[0],
                latitude: featuresArray[0].center[1]
            });
        }
    })
    .catch(err => {
        callback('Unable to connect Geocode API.', undefined);
    });
}

module.exports = geoCode;