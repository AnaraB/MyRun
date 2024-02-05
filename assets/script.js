// Save reference to import DOM elements
let currentDayEl = document.getElementById('currentDay');

// Global variables
let latitude;
let longitude;

// Get position
if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(
    function (position) {
      // console.log(position);
      latitude = position.coords.latitude;
      longitude = position.coords.longitude;

      const coords = [latitude, longitude];

      // Store result of set map in the map variable
      const map = L.map('map').setView(coords, 16);

      L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(map);

      // Add eventListener created by leaflet library, it listens to click event on the map
      map.on('click', function (mapEvent) {
        // Get coordinates of the point where it was clicked
        const lat = mapEvent.latlng.lat;
        const lng = mapEvent.latlng.lng;
        // Create array to store latitude and longitude
        const workoutsCoords = [lat, lng];
        L.marker(workoutsCoords)
          .addTo(map)
          .bindPopup(
            L.popup({
              maxWidth: 250,
              minWidth: 100,
              closeOnClick: false,
            })
          )
          .setPopupContent('Workout')
          .openPopup();
      });
    }
  );
}

// Function to load the map (assuming this was intended to be a separate function)
function loadMap() {
  // Add any code related to loading the map if needed
}




//handle displaying the time
function displayCurrentTime() {
  let rightNow = dayjs().format('dddd, MMMM D');
  currentDayEl.text(rightNow);
}

// display currentTime
setInterval(displayCurrentTime, 1000);


// get randow quote
const btnEl = $("#btn"); // Get button element
const quoteEl = $("#quote"); // Get quote element
const authorEl = $("#author"); // Get author element
const containerEl = $(".Mycontainer"); // Get container element

const apiURL = "https://api.quotable.io/random"; // API URL for fetching random quotes

async function getQuote() {
  try {
    btnEl.text("Loading..."); // Update button text to indicate loading
    btnEl.prop("disabled", true); // Disable the button
    // quoteEl.text("Updating..."); 
    // authorEl.text("Updating..."); 
    const response = await fetch(apiURL); // Fetch a random quote from the API
    const data = await response.json(); // Convert the response to JSON format
    const quoteContent = data.content; // Extract the quote content from the response
    const quoteAuthor = data.author; // Extract the quote author from the response
    quoteEl.text(quoteContent); // Update the quote element with the fetched quote content
    authorEl.text("~ " + quoteAuthor); // Update the author element with the fetched quote author
    btnEl.text("Get a quote"); // Restore the button text
    btnEl.prop("disabled", false); // Enable the button
    containerEl.css("display", "block"); // Show the container element
    console.log(data); // Log the fetched quote data to the console
  } catch (error) {
    console.log(error); // Log any errors to the console
    quoteEl.text("An error happened, try again later"); // Update quote text with error message
    authorEl.text("An error happened"); // Update author text with error message
    btnEl.text("Get a quote"); // Restore the button text
    btnEl.prop("disabled", false); // Enable the button
  }
}

containerEl.css("display", "none"); // Hide the container element initially
btnEl.on("click", getQuote); // Add event listener to the button for fetching a quote


// weather modal

const apikey = "379f54c3553fa3935a559271241c0049";

const weatherDataEl = $("#weather-data"); // Select the element with ID "weather-data"

const cityInputEl = $("#city-input"); // Select the element with ID "city-input"

const formEl = $("form"); // Select the form element

formEl.on("submit", (event) => {
  event.preventDefault(); // Prevent the default form submission behavior
  const cityValue = cityInputEl.val(); // Get the value of the input element
  getWeatherData(cityValue); // Call the getWeatherData function with the city value
});

async function getWeatherData(cityValue) {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${apikey}&units=metric`
    ); // Make a request to the OpenWeatherMap API

    if (!response.ok) {
      throw new Error("Network response was not ok"); // Throw an error if the response is not successful
    }

    const data = await response.json(); // Parse the response data

    const temperature = Math.round(data.main.temp); // Get the temperature value and round it

    const description = data.weather[0].description; // Get the weather description

    const icon = data.weather[0].icon; // Get the weather icon code

    const details = [
      `Feels like: ${Math.round(data.main.feels_like)}`,
      `Humidity: ${data.main.humidity}%`,
      `Wind speed: ${data.wind.speed} m/s`,
    ]; // Create an array of weather details

    weatherDataEl.find(".icon").html(`<img src="http://openweathermap.org/img/wn/${icon}.png" alt="Weather Icon">`); // Set the HTML content of the element with class "icon" to display the weather icon
    weatherDataEl.find(".temperature").text(`${temperature}°C`); // Set the text content of the element with class "temperature" to display the temperature
    weatherDataEl.find(".description").text(description); // Set the text content of the element with class "description" to display the weather description

    weatherDataEl.find(".details").html(details.map((detail) => `<div>${detail}</div>`).join("")); // Set the HTML content of the element with class "details" to display the weather details
  } catch (error) {
    weatherDataEl.find(".icon").html(""); // Clear the HTML content of the element with class "icon"
    weatherDataEl.find(".temperature").text(""); // Clear the text content of the element with class "temperature"
    weatherDataEl.find(".description").text("An error happened, please try again later"); // Set the text content of the element with class "description" to display an error message

    weatherDataEl.find(".details").html(""); // Clear the HTML content of the element with class "details"
  }
}