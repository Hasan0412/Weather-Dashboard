function getWeather() {
    const apiKey = '3ef3feb61b9b45fe96e200638232606';

    const cityInput = document.getElementById('city');
    const city = cityInput.value;
  
    const apiUrl = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`;

    fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      const weatherCard = document.getElementById('weatherCard');

      if (data.error) {
        weatherCard.innerHTML = `<p>${data.error.message}</p>`;
      } else {
        const { temp_c, condition, humidity, wind_kph } = data.current;
        const name = data.location.name;
        const country = data.location.country;
        
        const weatherHTML = `
          <h2>${name}, ${country}</h2>
          <p><strong>Temperature:</strong> ${temp_c}°C</p>
          <p><strong>Condition:</strong> ${condition.text}</p>
          <p><strong>Humidity:</strong> ${humidity}%</p>
          <p><strong>Wind Speed:</strong> ${wind_kph} km/h</p>
        `;
        
        weatherCard.innerHTML = weatherHTML;
      }
    })
    .catch(error => {
      const weatherCard = document.getElementById('weatherCard');
      weatherCard.innerHTML = '<p>An error occurred while fetching the weather data.</p>';
    });
}