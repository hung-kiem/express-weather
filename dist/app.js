"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const weather_1 = require("./weather");
const app = express_1.default();
const url = require('url');
app.get('/', (req, res, next) => {
    const weatherCache = weather_1.myCache.get("myWeather");
    const urlParts = url.parse(req.url, true);
    let cityCode = urlParts.query.cityCode;
    if (!!cityCode) {
        console.log(cityCode);
    }
    else {
        cityCode = '1581130';
    }
    if (!!weatherCache) {
        res.send(weatherCache);
    }
    else {
        weather_1.getWeatherData(cityCode);
        res.send(weather_1.myCache.get("myWeather"));
    }
});
var port = process.env.PORT || 8080;
app.listen(port, () => console.log('Server is running on port 8080'));
