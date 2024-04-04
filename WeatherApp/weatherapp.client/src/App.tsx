//import { useEffect, useState } from 'react';
import './App.css';
import LocalWeather from './Components/LocalWeather';
import React, { useState, useEffect } from 'react';
import SevendayWeather from './Components/SevendayWeather';

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

interface cityLocation {
    position: coordinates;
}

interface coordinates {
    lon: number;
    lat: number;
}

interface FivedayForecast {
    date: string;
    temperature: FivedayTemp;
}

interface FivedayTemp {
    minimum: Temp;
    maximum: Temp;
}

const App = () => {


    const [localCity, setLocalCity] = useState<string>("Seattle, WA");
    const [searchCity, setSearchCity] = useState<string>("");
    const [searchCityLocation, setSearchCityLocation] = useState<cityLocation | null>(null);
    const [singleView, setSingleView] = useState<boolean>(true);
    const [theForecast, setTheForecast] = useState<TrueForecast | null>(null);
    const [fivedayForecast, setFivedayForecast] = useState<FivedayForecast[]>();
    const [unitType, setUnitType] = useState<string>("metric");

    async function populateWeatherData(lon = 47.6061, lat = -122.332) {
        const res = await fetch(`https://atlas.microsoft.com/weather/currentConditions/json?api-version=1.1&query=${lon},${lat}&unit=${unitType}&details=false&subscription-key=MlibwupNzWRsCHlFw2G25Jhv1_ZrxTCY0la7Quiu0Io`)
            .then(res => res.json())
            .then(data => setTheForecast(data.results[0]));
        //const data = await res.json().then(data => 
        //    setTheForecast(data.results[0])
        //).then(() => {
            setSingleView(true);
            setFivedayForecast(null);
//        });
//;

        //data = data.results[0];
    //    setSingleView(true);
    //    setWeeklyForecast(null);
    //    setTheForecast(data.results[0]);
    //    setWeatherLink(`https://apidev.accuweather.com/developers/Media/Default/WeatherIcons/${theForecast.iconCode.toString().padStart(2, '0')}-s.png`);
    }

    async function populateWeeklyData(lon = 47.6061, lat = -122.332, unit = `metric`) {
        const response = await fetch(`https://atlas.microsoft.com/weather/forecast/daily/json?api-version=1.1&query=${lon},${lat}&unit=${unitType}&details=false&duration=5&subscription-key=MlibwupNzWRsCHlFw2G25Jhv1_ZrxTCY0la7Quiu0Io`);
        const data = await response.json();
        setFivedayForecast(data.forecasts);

        //setWeeklyForecast(data);
        setSingleView(false);
        setTheForecast(null);
    }

    async function searchWeatherData() {
        const response = await fetch(`https://atlas.microsoft.com/search/address/json?api-version=1.0&query=${searchCity}&countrySet=US&limit=1&subscription-key=MlibwupNzWRsCHlFw2G25Jhv1_ZrxTCY0la7Quiu0Io`)
            .then(response => response.json())
            .then(data =>
                setSearchCityLocation(data.results[0])
        ).finally(() => 
            //setTheForecast(null);
            setLocalCity(searchCity)
        )/*.then(() => populateWeatherData(searchCityLocation.position.lat, searchCityLocation.position.lon))*/;

        //const data = await response.json().then(data => {
        //    setSearchCityLocation(data.results[0])
        //    setLocalCity(searchCity);
        //});
        //setSearchCityLocation(data.results[0]);
    }


    useEffect(() => {
        if (searchCityLocation) {
            populateWeatherData(searchCityLocation.position.lat, searchCityLocation.position.lon);
        }
        else {
            populateWeatherData();

        }
    }, [searchCityLocation, unitType]);



    //const contents = forecasts === undefined
    //    ? <p><em>Loading... Please refresh once the ASP.NET backend has started. See <a href="https://aka.ms/jspsintegrationreact">https://aka.ms/jspsintegrationreact</a> for more details.</em></p>
    //    :
    //    <LocalWeather date={forecasts.date} emoji={forecasts.emoji} temperatureF={forecasts.temperatureF} summary={forecasts.summary} localCity={localCity} />;

    const todayClick = (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault();
        if (searchCityLocation) {
            populateWeatherData(searchCityLocation.position.lat, searchCityLocation.position.lon);
        }
        else {
            populateWeatherData();

        }
    };

    const thisWeekClick = (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault();
        if (searchCityLocation) {
            populateWeeklyData(searchCityLocation.position.lat, searchCityLocation.position.lon);
        }
        else {
            populateWeeklyData();
        }

    }

    const tripleClick = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        searchWeatherData();
        populateWeatherData(searchCityLocation.position.lat, searchCityLocation.position.lon);
    }

    const FarenheitToggle = (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault();
        if (unitType != "imperial") {
            setUnitType("imperial");
        }
    }
    const CelciusToggle = (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault();
        if (unitType != "metric") {
            setUnitType("metric");
        }
    }

    return (

        <main>
            <div className = "Header">
                <h1 className="PageTitle">The Weather Project</h1>
            </div>

            <div>
                <ul className="NavBar">
                    <li className="NavButton"><button onClick={FarenheitToggle}>Farenheit</button></li>
                    <li className="NavButton"><button onClick={ CelciusToggle }>Celcius</button></li>
                    <li className="NavButton"><button onClick={ todayClick }>Today</button></li>
                    <li className="NavButton"><button onClick={thisWeekClick}>5-day forecast</button></li>
                    <li>
                        <form onSubmit={tripleClick}>
                            <input type="text" name="City" placeholder="Search for weather" onChange={e => setSearchCity(e.target.value)} />
                            <button type="submit">Search City</button>
                        </form>
                    </li>
                </ul>

            </div>
            <div>
                <div className="MainContents">
                    {
                        theForecast ?
                            <LocalWeather dateTime={theForecast.dateTime.substring(0, 10)} phrase={theForecast.phrase} weatherImage={`https://apidev.accuweather.com/developers/Media/Default/WeatherIcons/${theForecast.iconCode.toString().padStart(2, '0')}-s.png`} hasPrecipitiation={theForecast.hasPrecipitiation} isDayTime={theForecast.isDayTime} temperature={theForecast.temperature.value} localCity={localCity} unit={theForecast.temperature.unit} />
                            : singleView ?
                                <h1>Loading...</h1>
                                : <>
                                    <h1 className="FiveDayHeader">5-day forecast for {localCity}</h1>
                                    {fivedayForecast?.map(item => <SevendayWeather date={item.date.substring(0, 10)} minTemp={item.temperature.minimum.value} maxTemp={item.temperature.maximum.value} unit={item.temperature.maximum.unit} />)}
                                </>
                    }
                </div>
            </div>
        </main>
    );

}

export default App;