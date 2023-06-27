function getWeather() {
  const apiKey = '3ef3feb61b9b45fe96e200638232606';

  const cityInput = document.getElementById('city');
  const city = cityInput.value;

  const apiUrl = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=5`;

  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      const weatherCard = document.getElementById('weatherCard');

      if (data.error) {
        weatherCard.innerHTML = `<p>${data.error.message}</p>`;
      } else {
        const forecast = data.forecast.forecastday;

        let weatherHTML = '<h2>5-Day Forecast</h2>';

        forecast.forEach(day => {
          const date = day.date;
          const { temp_c, condition, humidity, wind_kph } = day.day;

          weatherHTML += `
                      <div class="forecast-card">
                          <h3>${date}</h3>
                          <p><strong>Temperature:</strong> ${temp_c}°C</p>
                          <p><strong>Condition:</strong> ${condition.text}</p>
                          <p><strong>Humidity:</strong> ${humidity}%</p>
                          <p><strong>Wind Speed:</strong> ${wind_kph} km/h</p>
                      </div>
                  `;
        });

        weatherCard.innerHTML = weatherHTML;
      }
    })
    .catch(error => {
      const weatherCard = document.getElementById('weatherCard');
      weatherCard.innerHTML = '<p>An error occurred while fetching the weather data.</p>';
    });
}
