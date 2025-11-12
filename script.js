// Replace YOUR_API_KEY with your actual OpenWeatherMap API key
const apiKey = a9213c2cb089816c195909f586fc24ef; 

// Fetch and display current weather + 5-day forecast
function getWeather() {
  const city = document.getElementById("cityInput").value || "Hyderabad";

  // Current weather API call
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
    .then(res => res.json())
    .then(data => {
      if (data.cod === "404") {
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
      document.getElementById("weather").innerHTML = "<p>Error fetching data.</p>";
    });

  // 5-day forecast API call
  fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`)
    .then(res => res.json())
    .then(data => {
      const list = data.list.filter((item, index) => index % 8 === 0); // 1 per day
      let forecastHTML = "<h3>5-Day Forecast</h3>";

      list.forEach(day => {
        const date = new Date(day.dt_txt).toDateString();
        forecastHTML += `
          <div>
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

// Simple test function for JS
function celsiusToFahrenheit(c) {
  return (c * 9/5) + 32;
}

console.log("30°C in Fahrenheit:", celsiusToFahrenheit(30)); // should log 86
