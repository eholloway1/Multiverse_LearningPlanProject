interface Props {
    date: string;
    //temperatureC: number;
    minTemp: number;
    maxTemp: number;
    unit: string;
}


const SevendayWeather = (props: Props) => {


    return (
        <div className="WeatherCard">
            <h1 className="CurrentLocale">{props.date}</h1>
                <span className="Temp_Emoji">
                    <h1 className="FiveDayHighLow">High</h1>
                    <h1 className="FiveDayHighLow">{props.maxTemp}&deg;{props.unit}</h1>
                </span>
                <span className="Temp_Emoji">
                    <h1 className="FiveDayHighLow">Low</h1>
                    <h1 className="FiveDayHighLow">{props.minTemp}&deg;{props.unit}</h1>
                </span>
            </div>
    );

};

export default SevendayWeather;