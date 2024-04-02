interface Props {
    date: string[];
    //temperatureC: number;
    temperatureF: number[];
    summary: string[];
    emoji: string[];
    localCity: string;
}


const SevendayWeather = (props: Props) => {


    return (
        <div className = "WeatherCards">
        <div className="WeatherCard">
            <h2 className="CurrentLocale">This week's forecast for {props.localCity}</h2>


            <span className="Temp_Emoji">
                <h1 className="CurrentTemp">{props.temperatureF[0]}</h1>
                <h1 className="WeatherEmoji">{props.emoji[0]}</h1>
            </span>

                <h2 className="WeatherSummary">{props.summary[0]}</h2>
            </div>

        <div className="WeatherCard">

            <span className="Temp_Emoji">
                    <h1 className="CurrentTemp">{props.temperatureF[1]}</h1>
                    <h1 className="WeatherEmoji">{props.emoji[1]}</h1>
            </span>

            <h2 className="WeatherSummary">{props.summary[1]}</h2>
            </div>

        <div className="WeatherCard">


            <span className="Temp_Emoji">
                    <h1 className="CurrentTemp">{props.temperatureF[2]}</h1>
                    <h1 className="WeatherEmoji">{props.emoji[2]}</h1>
            </span>

            <h2 className="WeatherSummary">{props.summary[2]}</h2>
            </div>

        <div className="WeatherCard">


            <span className="Temp_Emoji">
                <h1 className="CurrentTemp">{props.temperatureF[3]}</h1>
                <h1 className="WeatherEmoji">{props.emoji[3]}</h1>
            </span>

            <h2 className="WeatherSummary">{props.summary[3]}</h2>
            </div>

        <div className="WeatherCard">


                <span className="Temp_Emoji">
                <h1 className="CurrentTemp">{props.temperatureF[4]}</h1>
                <h1 className="WeatherEmoji">{props.emoji[4]}</h1>
            </span>

            <h2 className="WeatherSummary">{props.summary[4]}</h2>
            </div>

        <div className="WeatherCard">


            <span className="Temp_Emoji">
                <h1 className="CurrentTemp">{props.temperatureF[5]}</h1>
                <h1 className="WeatherEmoji">{props.emoji[5]}</h1>
            </span>

            <h2 className="WeatherSummary">{props.summary[5]}</h2>
            </div>

        <div className="WeatherCard">


            <span className="Temp_Emoji">
                    <h1 className="CurrentTemp">{props.temperatureF[6]}</h1>
                <h1 className="WeatherEmoji">{props.emoji[6]}</h1>
            </span>

            <h2 className="WeatherSummary">{props.summary[6]}</h2>
        </div>
        </div>
    );

};

export default SevendayWeather;