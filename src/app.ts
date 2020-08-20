import express, { Application, Request, Response, NextFunction } from 'express'
import fetch from 'node-fetch'

const app: Application = express();

const url = require('url');
const NodeCache = require('node-cache');
const myCache = new NodeCache();

const getWeatherData = (cityId: string, apiKey: string) => {
    let url: string = 'http://api.openweathermap.org/data/2.5/weather?id=' + cityId + '&APPID=' + apiKey + '';
    fetch(url)
        .then(
            function (response) {
                if (response.status !== 200) {
                    console.log('Error code ' + response.status);
                    return;
                }
                // parse response data
                response.json().then(data => {
                    console.log(data);
                    myCache.set("myWeather", data, 20); // .set(key, value, timeExpire-seconds)
                })
            }
        )
        .catch((error) => {
            console.log('Error ' + error);
        });
}

app.get('/', (req: Request, res: Response, next: NextFunction) => {
    // const cityCode = '1581130';
    const apiKey = '0322db4d41fcfc67ea36b1718351ca82';
    const weatherCache = myCache.get("myWeather");
    const urlParts = url.parse(req.url, true);
    let cityCode = urlParts.query.cityCode;
    if (!!cityCode) {
        console.log(cityCode);
    } else {
        cityCode = '1581130';
    }
        if (!!weatherCache) {
            console.log("------- Get data from cache --------");
            console.log(weatherCache);
            console.log("------------------------------------");
            res.send(weatherCache);
        } else {
            console.log("------- Get new data -------");
            getWeatherData(cityCode, apiKey);
            console.log("------------------------------------");
            res.send(myCache.get("myWeather"));
        }
});

var port = process.env.PORT || 8080;
app.listen(port, () => console.log('Server is running on port 8080'));
