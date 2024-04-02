//import { useEffect, useState } from 'react';
import './App.css';
import LocalWeather from './Components/LocalWeather';
import React from 'react';
import { useState, useEffect } from 'react';
import SevendayWeather from './Components/SevendayWeather';

interface Forecast {
    date: string;
    temperatureC: number;
    temperatureF: number;
    summary: string;
    emoji: string;
}
interface Sevenday {
    date: string[];
    //temperatureC: number;
    temperatureF: number[];
    summary: string[];
    emoji: string[];
}

const App: React.FC = () => {


    const [forecasts, setForecasts] = useState<Forecast>(null);
    const [weeklyForecast, setWeeklyForecast] = useState<Sevenday>(null);
    const [localCity, setLocalCity] = useState<string>("");
    const [singleView, setSingleView] = useState<boolean>(true);

    async function populateWeatherData() {
        const response = await fetch('weatherforecast');
        const data = await response.json();
        setForecasts(data);
        setLocalCity("Seattle");
        setSingleView(true);
        setWeeklyForecast(null);
    }

    async function populateWeeklyData() {
        const response = await fetch('weatherforecast/sevenday');
        const data = await response.json();
        setWeeklyForecast(data);
        setSingleView(false);
        setForecasts(null);
    }

    useEffect(() => {
        populateWeatherData();
    }, []);



    //const contents = forecasts === undefined
    //    ? <p><em>Loading... Please refresh once the ASP.NET backend has started. See <a href="https://aka.ms/jspsintegrationreact">https://aka.ms/jspsintegrationreact</a> for more details.</em></p>
    //    :
    //    <LocalWeather date={forecasts.date} emoji={forecasts.emoji} temperatureF={forecasts.temperatureF} summary={forecasts.summary} localCity={localCity} />;

    const todayClick = (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault();
        populateWeatherData();
    };

    const thisWeekClick = (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault();
        populateWeeklyData();
    }

    return (

        <main>
            <div className = "Header">
                <h1 className="PageTitle">The Weather Project</h1>
            </div>

            <div>
                <ul className="NavBar">
                    <li><button onClick={ todayClick }>Today</button></li>
                    <li className="NavButton"><button onClick = { thisWeekClick }>This Week</button></li>
                 </ul>
            </div>
            <div>
                <div className="MainContents">
                    {
                        forecasts ?
                        <LocalWeather date={forecasts.date} temperatureF={forecasts.temperatureF} summary={forecasts.summary} emoji={forecasts.emoji} localCity={localCity} />
                            : singleView ?
                                <h1>Loading...</h1>
                                : <SevendayWeather date={weeklyForecast.date} temperatureF={weeklyForecast.temperatureF} summary={weeklyForecast.summary} emoji={weeklyForecast.emoji} localCity={localCity} />
                    }
                </div>
            </div>
        </main>
    );

}

export default App;