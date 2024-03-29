import { useEffect, useState } from 'react';
import './App.css';

interface Forecast {
    date: string;
    temperatureC: number;
    temperatureF: number;
    summary: string;
    emoji: string;
}

function App() {

    const [forecasts, setForecasts] = useState<Forecast>();
    const [localCity, setLocalCity] = useState<string>();

    useEffect(() => {
        populateWeatherData();
    }, []);

    const contents = forecasts === undefined
        ? <p><em>Loading... Please refresh once the ASP.NET backend has started. See <a href="https://aka.ms/jspsintegrationreact">https://aka.ms/jspsintegrationreact</a> for more details.</em></p>
        : <>
            <div>
                <h2 id="CurrentLocale">{localCity} Weather for {forecasts.date}</h2>
                <span id = "Temp_Emoji">
                    <h1 id= "CurrentTemp">{forecasts.temperatureF}</h1>
                    <h1 id = "WeatherEmoji">{forecasts.emoji}</h1>
                </span>
                <h2 id = "WeatherSummary">{forecasts.summary}</h2>
            </div>
         </>;

    return (
        <>
            <div id = "Header">
                <h1 id="PageTitle">The Weather Project</h1>
            </div>

            <div>
                <ul id="NavBar">
                    <li className = "NavButton">Today</li>
                    <li className = "NavButton">This Week</li>
                 </ul>
            </div>

            <main id = "Weather">
                {contents}
            </main>

        </>
    );

    async function populateWeatherData() {
        const response = await fetch('weatherforecast');
        const data = await response.json();
        setForecasts(data);
        setLocalCity("Seattle");
    }
}

export default App;