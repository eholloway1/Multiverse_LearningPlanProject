using Microsoft.AspNetCore.Mvc;
using WeatherApp.Server.Models;

namespace WeatherApp.Server.Controllers
{
        [ApiController]
        [Route("weatherforecast/sevenday")]
        public class SevendayForecastController : ControllerBase
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

            private readonly ILogger<SevendayForecastController> _logger;

            public SevendayForecastController(ILogger<SevendayForecastController> logger)
            {
                _logger = logger;
            }

            [HttpGet]
            public async Task<SevendayForecast> Get()
            {
                DateOnly[] tempDate = new DateOnly[7];
                for (int i = 0; i < tempDate.Length; i++)
                {
                    tempDate[i] = DateOnly.FromDateTime(DateTime.Now.AddDays(i));
                }

                int[] TempF = new int[7];
                for (int i = 0; i < TempF.Length; i++)
                {
                    TempF[i] = Random.Shared.Next(-20, 55);
                }

                string[] tempSumm = new string[7];
                for (int i = 0; i < tempSumm.Length; i++)
                {
                    tempSumm[i] = Summaries[Random.Shared.Next(Summaries.Length)];
                }

                string[] tempEmo = new string[7];
                for (int i = 0; i < tempEmo.Length; i++)
                {
                    tempEmo[i] = Emojis[Random.Shared.Next(Emojis.Length)];
                }

                return new SevendayForecast
                {
                    Date = tempDate,
                    TemperatureF = TempF,
                    Summary = tempSumm,
                    Emoji = tempEmo
                };
            }
        }

}
