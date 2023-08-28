// Function to fetch weather data for the given city
function getWeather() {
  const apiKey = '3ef3feb61b9b45fe96e200638232606';

  // Get user input for the city
  const cityInput = document.getElementById('city');
  const city = cityInput.value;

  // Construct the API URL for fetching weather data
  const apiUrl = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=6`;

  // Fetch weather data from the API
  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      const weatherCard = document.getElementById('weatherCard');

      if (data.error) {
        // Display error message if there's an issue with the API request
        weatherCard.innerHTML = `<p>${data.error.message}</p>`;
      } else {
        // Extract current and forecast data from the API response
        const current = data.current;
        const forecast = data.forecast.forecastday.slice(1); // Exclude current day

        // Prepare HTML to display current weather
        let weatherHTML = '<h2>Current Weather</h2>';

        weatherHTML += `
          <div class="forecast-card">
            <h3>${data.location.name}, ${data.location.country}</h3>
            <p><strong>Temperature:</strong> ${current.temp_c}°C</p>
            <p><strong>Condition:</strong> ${current.condition.text}</p>
            <p><strong>Humidity:</strong> ${current.humidity}%</p>
            <p><strong>Wind Speed:</strong> ${current.wind_kph} km/h</p>
            <img src="https:${current.condition.icon}" alt="Weather Icon">
          </div>
        `;

        // Prepare HTML to display 5-day forecast
        weatherHTML += '<h2>5-Day Forecast</h2>';

        forecast.forEach(day => {
          const date = day.date;
          const { avgtemp_c, condition, avghumidity, maxwind_kph } = day.day;

          weatherHTML += `
            <div class="forecast-card">
              <h3>${date}</h3>
              <p><strong>Average Temperature:</strong> ${avgtemp_c}°C</p>
              <p><strong>Condition:</strong> ${condition.text}</p>
              <p><strong>Average Humidity:</strong> ${avghumidity}%</p>
              <p><strong>Max Wind Speed:</strong> ${maxwind_kph} km/h</p>
              <img src="https:${condition.icon}" alt="Weather Icon">
            </div>
          `;
        });

        // Display weather data and update search history
        weatherCard.innerHTML = weatherHTML;
        addToSearchHistory(city);
        displaySearchHistory();
      }
    })
    .catch(error => {
      // Display error message if the fetch operation encounters an error
      const weatherCard = document.getElementById('weatherCard');
      weatherCard.innerHTML = '<p>An error occurred while fetching the weather data.</p>';
    });
}

// Function to add the city to search history
function addToSearchHistory(city) {
  const searchHistory = getSearchHistory();

  if (!searchHistory.includes(city)) {
    searchHistory.push(city);
  }

  localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
}

// Function to retrieve search history from local storage
function getSearchHistory() {
  const searchHistory = localStorage.getItem('searchHistory');
  return searchHistory ? JSON.parse(searchHistory) : [];
}

// Function to display search history buttons
function displaySearchHistory() {
  const historyList = document.getElementById('historyList');
  historyList.innerHTML = '';

  const searchHistory = getSearchHistory();

  searchHistory.forEach(city => {
    const li = document.createElement('li');
    const button = document.createElement('button');
    button.textContent = city;
    button.addEventListener('click', () => {
      // Set the city input value and fetch weather on button click
      document.getElementById('city').value = city;
      getWeather();
    });
    li.appendChild(button);
    historyList.appendChild(li);
  });
}

// Call displaySearchHistory when the page content is loaded
document.addEventListener('DOMContentLoaded', () => {
  displaySearchHistory();
});
