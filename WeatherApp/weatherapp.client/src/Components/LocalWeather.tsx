import { useState, useEffect} from "react";

interface Forecast {
    date: string;
    temperatureC: number;
    temperatureF: number;
    summary: string;
    emoji: string;
}


const LocalWeather = () => {

    const [forecasts, setForecasts] = useState<Forecast>(null);
    const [localCity, setLocalCity] = useState<string>("");

    async function populateWeatherData() {
        const response = await fetch('weatherforecast');
        const data = await response.json();
        setForecasts(data);
        setLocalCity("Seattle");
    }


    useEffect(() => {
        populateWeatherData();
    }, []);

    return (
        forecasts ?
        <div id="WeatherCard">
            <h2 id="CurrentLocale">{localCity} Weather for {forecasts.date}</h2>

            <span id="Temp_Emoji">
                <h1 id="CurrentTemp">{forecasts.temperatureF}</h1>
                <h1 id="WeatherEmoji">{forecasts.emoji}</h1>
            </span>

            <h2 id="WeatherSummary">{forecasts.summary}</h2>
        </div>
        : <h1>Loading....</h1>

    );

};

export default LocalWeather;