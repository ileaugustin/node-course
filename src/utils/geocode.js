const request = require("request");

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiYXVndXN0aW5pbGVhIiwiYSI6ImNreWJ6c3Z2ODBpMHgycXA1ZGI1cHozc2cifQ.yIfpg3Ktp0iF2NtJQYxvmg&limit=1'

    request({ url, json: true }, (err, response) => {
        if (err) {
            callback("Unable to connect to geo url.")
            return;
        }

        const {
            body: {
                message,
                features
            }
        } = response;
        if (message) {
            callback("Failed to load: ");
            return;
        }

        if (!features.length) {
            callback("Cannot load this location. Try another.");
            return;
        }

        const {
            body: {
                features: [{
                    center: [long, lat],
                    place_name
                }]
            }
        } = response;
        callback(null, {
            long,
            lat,
            location: place_name
        })
    })
}

module.exports = geocode