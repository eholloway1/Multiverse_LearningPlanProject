using Microsoft.AspNetCore.Mvc;
using WeatherApp.Server.Models;

namespace WeatherApp.Server.Controllers
{
    [ApiController]
    [Route("weatherforecast")]
    public class WeatherForecastController : ControllerBase
    {
        //Summaries to randomly grab from
        private static readonly string[] Summaries = new[]
        {
            "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
        };

        private static readonly string[] Emojis = new[]
        {
            "\U00002601", "\U000026C5", "\U000026C8", "\U0001F324", "\U0001F327", "\U0001F328", "\U0001F32B"
        };

        private readonly ILogger<WeatherForecastController> _logger;

        public WeatherForecastController(ILogger<WeatherForecastController> logger)
        {
            _logger = logger;
        }

        //[Http{Get/Put/Post/Delete}(Name = unnecessary)
        [HttpGet]
        //IEnumberable<T> returns a collection of objects of type<T>
        public async Task<WeatherForecast> Get()  
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
                Emoji = Emojis[Random.Shared.Next(Emojis.Length)]
            };
        }
    }
}
