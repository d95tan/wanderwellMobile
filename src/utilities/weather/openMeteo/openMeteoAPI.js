import { format } from "date-fns";

function dateToString(date) {
    return format(date, "yyyy-MM-dd");
}

export async function getForecastWeather({ lat, long }, start, end) {
    const startString = dateToString(start);
    const endString = dateToString(end);
    
    const url =
        "https://api.open-meteo.com/v1/forecast?" +
        `latitude=${lat}&longitude=${long}` +
        "&daily=weather_code,temperature_2m_max,temperature_2m_min&" +
        `start_date=${startString}&end_date=${endString}`; //date in yyyy-mm-dd

    const response = await fetch(url);
    const json = await response.json();
    return json;
}

export async function getHistoricalWeather({ lat, long }, start, end) {
    const startString = dateToString(start);
    const endString = dateToString(end);
    
    const url =
        "https://archive-api.open-meteo.com/v1/archive?" +
        `latitude=${lat}&longitude=${long}&` +
        `start_date=${startString}&end_date=${endString}` +
        "&daily=temperature_2m_max,temperature_2m_min";

    const response = await fetch(url);
    const json = await response.json();
    return json;
}