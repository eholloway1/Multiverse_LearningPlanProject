using Microsoft.AspNetCore.Mvc;

namespace WeatherApp.Server.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class WeatherForecastController : ControllerBase
    {
        //Summaries to randomly grab from
        private static readonly string[] Summaries = new[]
        {
            "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
        };

        private static readonly string[] Emojis = new[]
        {
            "& #x1F603"
        };
        private readonly ILogger<WeatherForecastController> _logger;

        public WeatherForecastController(ILogger<WeatherForecastController> logger)
        {
            _logger = logger;
        }

        //[Http{Get/Put/Post/Delete}(Name = unnecessary)
        [HttpGet(Name = "GetWeatherForecast")]
        //IEnumberable<T> returns a collection of objects of type<T>
        public WeatherForecast Get()  
        {
            //returns and WeatherForecast[5]
            return new WeatherForecast
            {
                //date is set from 1-5 days from current day
                Date = DateOnly.FromDateTime(DateTime.Now),
                //generates random temp from -20-55C, Farenheit temp is generated off Celsius
                TemperatureC = Random.Shared.Next(-20, 55),
                //grabs random string from Summaries[]
                Summary = Summaries[Random.Shared.Next(Summaries.Length)],
                Emoji = Emojis[0]
            };
        }
    }
}
