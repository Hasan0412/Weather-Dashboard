function getweather() {
    const apiKey = '3ef3feb61b9b45fe96e200638232606';

    const cityInput = document.getElementById('city');
    const city = cityInput.value;
  
    const apiUrl = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`;

    fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      const weatherCard = document.getElementById('weatherCard');
});
}