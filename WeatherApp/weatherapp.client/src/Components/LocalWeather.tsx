//import { useState, useEffect} from "react";

interface Props {
    date: string;
    //temperatureC: number;
    temperatureF: number;
    summary: string;
    emoji: string;
    localCity: string;
}


const LocalWeather = (props: Props) => {


    return (
        <div className="WeatherCard">
            <h2 className="CurrentLocale">{props.localCity} Weather for {props.date}</h2>

            <span className="Temp_Emoji">
                <h1 className="CurrentTemp">{props.temperatureF}</h1>
                <h1 className="WeatherEmoji">{props.emoji}</h1>
            </span>

            <h2 className="WeatherSummary">{props.summary}</h2>
        </div>

    );

};

export default LocalWeather;