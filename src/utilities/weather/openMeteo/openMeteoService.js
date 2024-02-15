import { add, isAfter, differenceInCalendarDays, subYears } from "date-fns";
import * as openMeteoAPI from "./openMeteoAPI";
import { weatherCodes } from "./openMeteoCode";

export async function getWeather(coords, start, end) {
  const today = new Date();

  let historical, forecast;

  //Holiday is over
  if (isAfter(today, end)) {
    return null;
  }

  //Holiday is ongoing
  if (isAfter(today, start)) {
    start = today;
  }

  if (differenceInCalendarDays(start, today) > 14) {
    historical = await openMeteoAPI.getHistoricalWeather(
      coords,
      subYears(start, 1),
      subYears(end, 1)
    );
  } else {
    //holiday ends in less than 14 days
    if (differenceInCalendarDays(end, today) <= 14) {
      forecast = await openMeteoAPI.getForecastWeather(coords, start, end);
    }
    //holiday starts in less than 14 days, ends more than 14 days away
    else {
      forecast = await openMeteoAPI.getForecastWeather(
        coords,
        start,
        addDays(today, 14)
      );
      historical = await openMeteoAPI.getHistoricalWeather(
        coords,
        subYears(addDays(today, 15), 1),
        subYears(end, 1)
      );
    }
  }

  const weatherData = sortWeatherData(forecast, historical);

  return weatherData;
}

function sortWeatherData(forecast, historical) {
  const weather = [];
  if (forecast) {
    let daily = forecast.daily;
    for (let i = 0; i < daily.time.length; i++) {
      const today = {
        date: new Date(daily.time[i]),
        high: daily.temperature_2m_max[i],
        low: daily.temperature_2m_min[i],
        weatherString: weatherCodes[daily.weather_code[i]],
      };
      weather.push(today);
    }
  }
  if (historical) {
    let daily = historical.daily;
    for (let i = 0; i < daily.time.length; i++) {
      const today = {
        date: add(new Date(daily.time[i]), { years: 1 }),
        high: daily.temperature_2m_max[i],
        low: daily.temperature_2m_min[i],
      };
      weather.push(today);
    }
  }
  return weather;
}
