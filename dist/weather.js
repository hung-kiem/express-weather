"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.myCache = exports.getWeatherData = void 0;
const node_fetch_1 = __importDefault(require("node-fetch"));
const cache_1 = require("./cache");
Object.defineProperty(exports, "myCache", { enumerable: true, get: function () { return cache_1.myCache; } });
function getWeatherData(cityId) {
    let apiKey = '0322db4d41fcfc67ea36b1718351ca82';
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
            cache_1.myCache.set("myWeather", data, 20); // .set(key, value, timeExpire-seconds)
        });
    })
        .catch((error) => {
        console.log('Error ' + error);
    });
}
exports.getWeatherData = getWeatherData;
