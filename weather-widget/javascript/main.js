const API_KEY = config.WEATHER_API_KEY; // Access the API key from config.js

// Ensure DOM is fully loaded before adding event listeners
document.addEventListener('DOMContentLoaded', () => {
  // Function to fetch weather data
  function getWeatherData(zipcode) {
    const url = `https://api.openweathermap.org/data/2.5/weather?zip=${zipcode}&appid=${API_KEY}`;
    console.log(`Fetching weather data from: ${url}`);
    fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
      })
      .then(data => {
        console.log('Weather data:', data);
        displayWeatherData(data);
      })
      .catch(error => console.error('Error fetching the weather data:', error));
  }

  // Function to display weather data
  function displayWeatherData(data) {
    const cityName = document.querySelector('.city_name');
    const temperature = document.querySelector('.temperature');

    if (data.cod === 200) {
      cityName.textContent = data.name;
      temperature.textContent = `${(data.main.temp - 273.15).toFixed(2)}°C`; // Convert from Kelvin to Celsius
    } else {
      cityName.textContent = 'Error';
      temperature.textContent = data.message;
    }
  }

  // Add event listener to the search button
  document.querySelector('.search-button').addEventListener('click', () => {
    const zipcode = document.querySelector('.zipcode').value.trim();
    if (zipcode) {
      getWeatherData(zipcode);
    } else {
      console.error('Zipcode is required');
    }
  });
});
