// ✅ Replace with your actual OpenWeatherMap API key
const apiKey = "a9213c2cb089816c195909f586fc24ef";

// 🏙️ Load default city on page start
window.onload = function () {
  getWeather("Hyderabad");
};

// 🌦️ Main function – fetch current weather + forecast
function getWeather(defaultCity) {
  const city = defaultCity || document.getElementById("cityInput").value;

  if (!city) {
    alert("Please enter a city name!");
    return;
  }

  // --- Current Weather API Call ---
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
    .then(response => response.json())
    .then(data => {
      if (data.cod !== 200) {
        document.getElementById("weather").innerHTML = "<p>City not found!</p>";
        return;
      }

      document.getElementById("weather").innerHTML = `
        <h2>${data.name}</h2>
        <p>🌡️ Temperature: ${data.main.temp}°C</p>
        <p>☁️ Weather: ${data.weather[0].description}</p>
        <p>💧 Humidity: ${data.main.humidity}%</p>
        <p>🌬️ Wind Speed: ${data.wind.speed} m/s</p>
      `;
    })
    .catch(() => {
      document.getElementById("weather").innerHTML = "<p>Error fetching weather data.</p>";
    });

  // --- 5-Day Forecast API Call ---
  fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`)
    .then(response => response.json())
    .then(data => {
      const list = data.list.filter((_, index) => index % 8 === 0); // 1 forecast/day
      let forecastHTML = "<h3>5-Day Forecast</h3>";

      list.forEach(day => {
        const date = new Date(day.dt_txt).toDateString();
        forecastHTML += `
          <div class="forecast-day">
            <h4>${date}</h4>
            <p>🌡️ ${day.main.temp}°C</p>
            <p>☁️ ${day.weather[0].description}</p>
          </div>
        `;
      });

      document.getElementById("forecast").innerHTML = forecastHTML;
    })
    .catch(() => {
      document.getElementById("forecast").innerHTML = "<p>Error fetching forecast data.</p>";
    });
}

// 🔬 Simple JS Test Function
function celsiusToFahrenheit(c) {
  return (c * 9 / 5) + 32;
}

console.log("30°C in Fahrenheit:", celsiusToFahrenheit(30)); // should log 86
