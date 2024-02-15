//* # Code	Description
//* 0	Clear sky
//* 1, 2, 3	Mainly clear, partly cloudy, and overcast
//* 45, 48	Fog and depositing rime fog
//* 51, 53, 55	Drizzle: Light, moderate, and dense intensity
//* 56, 57	Freezing Drizzle: Light and dense intensity
//* 61, 63, 65	Rain: Slight, moderate and heavy intensity
//* 66, 67	Freezing Rain: Light and heavy intensity
//* 71, 73, 75	Snow fall: Slight, moderate, and heavy intensity
//* 77	Snow grains
//* 80, 81, 82	Rain showers: Slight, moderate, and violent
//* 85, 86	Snow showers slight and heavy
//* 95 *	Thunderstorm: Slight or moderate
//* 96, 99 *	Thunderstorm with slight and heavy hail

export const weatherCodes =
{
    0: "☀️",
    1: "🌤", 2: "⛅️", 3: "🌥",
    45: "☁️",  48: "🌨",
    51: "🌦", 53: "🌦", 55: "🌧",
    56: "🌨", 57: "🌨",
    61: "🌧", 63: "🌧", 65: "🌧",
    66: "🌨", 67: "🌨",
    71: "❄️", 73: "❄️", 75: "❄️",
    80: "🌧", 81: "🌧", 82: "🌧",
    85: "🌨", 86: "🌨",
    95: "⛈",
    96: "⛈", 99: "⛈",
}