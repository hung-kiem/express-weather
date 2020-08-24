import fetch from 'node-fetch';
import { myCache } from './cache'

export function getWeatherData(cityId: string) {
    let apiKey = '0322db4d41fcfc67ea36b1718351ca82';
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

export { myCache }