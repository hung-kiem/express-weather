"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const node_fetch_1 = __importDefault(require("node-fetch"));
const app = express_1.default();
const NodeCache = require('node-cache');
const myCache = new NodeCache();
const getWeatherData = (cityId, apiKey) => {
    let url = 'http://api.openweathermap.org/data/2.5/weather?id=' + cityId + '&APPID=' + apiKey + '';
    node_fetch_1.default(url)
        .then(function (response) {
        if (response.status !== 200) {
            console.log('Error code ' + response.status);
            return;
        }
        // parse response data
        response.json().then(data => {
            console.log(data);
            myCache.set("myWeather", data, 20); // .set(key, value, timeExpire-seconds)
        });
    })
        .catch((error) => {
        console.log('Error ' + error);
    });
};
app.get('/', (req, res, next) => {
    const cityCode = '1581130';
    const apiKey = '0322db4d41fcfc67ea36b1718351ca82';
    const weatherCache = myCache.get("myWeather");
    if (!!weatherCache) {
        console.log("------- Get data from cache --------");
        console.log(weatherCache);
        console.log("------------------------------------");
        res.send(weatherCache);
    }
    else {
        console.log("(------- Get new data -------");
        getWeatherData(cityCode, apiKey);
        console.log("------------------------------------");
        res.send(myCache.get("myWeather"));
    }
});
var port = process.env.PORT || 8080;
app.listen(port, () => console.log('Server is running on port 8080'));
