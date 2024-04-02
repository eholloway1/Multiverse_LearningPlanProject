namespace WeatherApp.Server.Models
{
    public class SevendayForecast
    {
        public DateOnly[] Date { get; set; }

        public int[] TemperatureF { get; set; }

        public string[]? Summary { get; set; }

        public string[]? Emoji { get; set; }

    }
}
