const request = require("request");

const forecast = (lon, lat, callback) => {
    const url = 'https://api.openweathermap.org/data/2.5/weather?lat=' + encodeURIComponent(lat) + '&lon=' + encodeURIComponent(lon) +'&units=metric&lang=ro&appid=88bffe30a7168d1ad68413b23e1875ec';
    request({ url, json: true }, (err, resp) => {
        if (err) {
            callback("Unable to connect to weather url.")
            return;
        }

        const {
            body: {
                message
            }
        } = resp;

        if (message) {
            callback("Failed: " + message)
            return;
        }

        const {
            body: {
                main: {
                    temp,
                    feels_like,
                    pressure,
                    humidity
                },
                weather: [{ description }],
                clouds: {
                    all: clouds
                }
            }
        } = resp;

        callback(null, description + ", temp e " + temp + ", dar se simt ca " + feels_like + " si avem nori " + clouds + ". Presiune atmosferica " + pressure + ", umiditate " + humidity)
    })
}

module.exports = forecast;
