import { useEffect, useState } from 'react';
import './App.css';

interface Forecast {
    date: string;
    temperatureC: number;
    temperatureF: number;
    summary: string;
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
            {forecasts.date}
            {forecasts.temperatureC}
            {forecasts.temperatureF}
            {forecasts.summary}
        </>;

    return (
        <div>
            <h1>Weather for {localCity}</h1>
            <p>This component demonstrates fetching data from the server.</p>
            <p>{contents}</p>
        </div>
    );

    async function populateWeatherData() {
        const response = await fetch('weatherforecast');
        const data = await response.json();
        setForecasts(data);
        setLocalCity("Seattle");
    }
}

export default App;