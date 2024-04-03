//import { useEffect, useState } from 'react';
import './App.css';
import LocalWeather from './Components/LocalWeather';
import React from 'react';
import { useState, useEffect } from 'react';
import SevendayWeather from './Components/SevendayWeather';
import { Transform } from 'stream';

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

interface TrueForecast {
    dateTime: string;
    phrase: string;
    iconCode: number;
    hasPrecipitiation: boolean;
    isDayTime: boolean;
    temperature: Temp;
}
interface Temp {
    value: number;
    unit: string;
    unitType: number;
}

const App: React.FC = () => {


    const [weeklyForecast, setWeeklyForecast] = useState<Sevenday>(null);
    const [localCity, setLocalCity] = useState<string>("");
    const [singleView, setSingleView] = useState<boolean>(true);
    const [theForecast, setTheForecast] = useState<TrueForecast>(null);
    const [weatherLink, setWeatherLink] = useState<string>('');

    async function populateWeatherData() {
        const response = await fetch('weatherforecast');
        const data = await response.json();
        const res = await fetch("https://atlas.microsoft.com/weather/currentConditions/json?api-version=1.1&query=47.6061,122.3328&details=false&subscription-key=MlibwupNzWRsCHlFw2G25Jhv1_ZrxTCY0la7Quiu0Io");
        let data2 = await res.json();
        data2 = data2.results[0];
        
        setLocalCity("Seattle");
        setSingleView(true);
        setWeeklyForecast(null);
        setTheForecast(data2);
        setWeatherLink(`https://apidev.accuweather.com/developers/Media/Default/WeatherIcons/${theForecast.iconCode.toString().padStart(2, '0')}-s.png`);
    }
    async function populateWeeklyData() {
        const response = await fetch('weatherforecast/sevenday');
        const data = await response.json();
        setWeeklyForecast(data);
        setSingleView(false);
        setTheForecast(null);
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
                        theForecast ?
                            <LocalWeather dateTime={theForecast.dateTime.substring(0, 10)} phrase={theForecast.phrase} weatherImage={weatherLink} hasPrecipitiation={theForecast.hasPrecipitiation} isDayTime={theForecast.isDayTime} temperature={theForecast.temperature.value} localCity={localCity} />
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