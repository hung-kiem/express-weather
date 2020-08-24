import express, { Application, Request, Response, NextFunction } from 'express'
import { getWeatherData, myCache } from './weather'

const app: Application = express();
const url = require('url');

app.get('/', (req: Request, res: Response, next: NextFunction) => {
    const weatherCache = myCache.get("myWeather");
    const urlParts = url.parse(req.url, true);
    let cityCode = urlParts.query.cityCode;
    if (!!cityCode) {
        console.log(cityCode);
    } else {
        cityCode = '1581130';
    }
    if (!!weatherCache) {
        res.send(weatherCache);
    } else {
        getWeatherData(cityCode);
        res.send(myCache.get("myWeather"));
    }
});

var port = process.env.PORT || 8080;
app.listen(port, () => console.log('Server is running on port 8080'));
