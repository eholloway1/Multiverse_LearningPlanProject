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

        [HttpGet]
        public async Task<WeatherForecast> Get()  
        {
            return new WeatherForecast
            {
                Date = DateOnly.FromDateTime(DateTime.Now),
                TemperatureC = Random.Shared.Next(-20, 55),
                Summary = Summaries[Random.Shared.Next(Summaries.Length)],
                Emoji = Emojis[Random.Shared.Next(Emojis.Length)]
            };
        }
    }
}
