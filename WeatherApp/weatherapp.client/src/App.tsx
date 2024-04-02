//import { useEffect, useState } from 'react';
import './App.css';
import LocalWeather from './Components/LocalWeather';
import React from 'react';

//interface Forecast {
//    date: string;
//    temperatureC: number;
//    temperatureF: number;
//    summary: string;
//    emoji: string;
//}

const App: React.FC = () => {





    //const contents = forecasts === undefined
    //    ? <p><em>Loading... Please refresh once the ASP.NET backend has started. See <a href="https://aka.ms/jspsintegrationreact">https://aka.ms/jspsintegrationreact</a> for more details.</em></p>
    //    :
    //    <LocalWeather date={forecasts.date} emoji={forecasts.emoji} temperatureF={forecasts.temperatureF} summary={forecasts.summary} localCity={localCity} />;

    return (

        <main>

            <div id = "Header">
                <h1 id="PageTitle">The Weather Project</h1>
            </div>

            <div>
                <ul id="NavBar">
                    <li className = "NavButton">Today</li>
                    <li className = "NavButton">This Week</li>
                 </ul>
            </div>
            <div>
                <div id="MainContents">
                    <LocalWeather  />
                </div>
            </div>
        </main>
    );

}

export default App;