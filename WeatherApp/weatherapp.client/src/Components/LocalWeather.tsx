//import { useState, useEffect} from "react";

interface Props {
    dateTime: string;
    phrase: string;
    weatherImage: string;
    hasPrecipitiation: boolean;
    isDayTime: boolean;
    temperature: number;
    localCity: string;
    unit: string;
}
interface Temp {
    value: number;
    unit: string;
    unitType: number;
}


const LocalWeather = (props: Props) => {


    return (
        <div className="WeatherCard">
            <h2 className="CurrentLocale">Current weather for {props.localCity}</h2>

            <span className="Temp_Emoji">
                <h1 className="CurrentTemp">{props.temperature}&deg;{props.unit}</h1>
                <img src={props.weatherImage} class="weatherImage"></img>
            </span>

            <h2 className="WeatherSummary">{props.phrase}</h2>
        </div>

    );

};

export default LocalWeather;