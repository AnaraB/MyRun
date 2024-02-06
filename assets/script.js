
// Save reference to import DOM elements
let currentDayEl = document.getElementById('currentDay');

//save reference to import DOM elements
var currentDayEl = $('#currentDay');
let workoutdetailsdiv = document.getElementById("workoutdetails")
var running = $('.select-type');
var distance = $('.input-distance');
var duration = $('.input-duration');


// global variables
let lat;
let lng;
let map;

// Page Load markers from prevs workout
function loadPrevsMrk() {
  // Loop through local storage for prevs marker cords
  let prevsWorkOuts = localStorage.getItem("workouts")
  console.log(prevsWorkOuts)

  // Parse the JSON string to an array
  let workouts = JSON.parse(prevsWorkOuts);

  // Check if there are stored workouts
  if (workouts) {
    workouts.forEach(function (workout) {
      // Add marker to the map based on lat/lng
      const workoutsCoords = [workout.lat, workout.lng];
      L.marker(workoutsCoords)
        .addTo(map)
        .bindPopup(
          L.popup({
            maxWidth: 250,
            minWidth: 100,
            closeOnClick: false,
          })
        )
        .setPopupContent(`Distance: ${workout.distance} km<br>Duration: ${workout.duration} mins`)
        .openPopup();

      // Render the workout on the list
      renderWorkoutOnlist(workout);
    });
  }
}

// Get position
if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(
    function (position) {
      // console.log(position);
      latitude = position.coords.latitude;
      longitude = position.coords.longitude;

      const coords = [latitude, longitude];

      // Store result of set map in the map variable
      map = L.map('map').setView(coords, 16);

      L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(map);

      // Add eventListener created by leflet library, it listens to click event on the map
      map.on('click', function (mapEvent) {
        // Get coordinates of the point where it was clicked
        lat = mapEvent.latlng.lat;
        lng = mapEvent.latlng.lng;
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

      })
    },
    function () {
      alert('Could not get your position');
    }
  )
}

// Handle displaying the time
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
// Display currentTime
setInterval(displayCurrentTime, 1000);


// ----------------------WorkOut-----------------------------------// 

// Call the render functions with the sample workout
let workoutsElement = document.querySelector('.workouts');
let div = document.createElement("div");
div.classList.add("workout-item");

function renderWorkoutOnlist(workouts) {
  let div = document.createElement("div");
  let workout_type_para = document.createElement("p");
  workout_type_para.innerHTML = "Activity type: " + workouts.type;

  let workout_distance_para = document.createElement("p");
  workout_distance_para.innerHTML = "Distance " + workouts.distance;
  div.append(workout_type_para, workout_distance_para);

  let workout_Duration_para = document.createElement("p");
  workout_Duration_para.innerHTML = "Time " + workouts.duration;
  div.append(workout_type_para, workout_distance_para, workout_Duration_para);

  workoutdetailsdiv.append(div);
}

// Workout Array objects
var workouts = [];

// Load workouts from local storage
if (localStorage.getItem('workouts')) {
  workouts = JSON.parse(localStorage.getItem('workouts'));
  workouts.forEach(function (workout) {
    renderWorkoutOnlist(workout);
  });
}

// ----------------------Form submission ------------------------//
// Event listener for submission
var form = document.querySelector('.form-bg');
form.addEventListener('submit', handleFormSubmit);

function handleFormSubmit(event) {
  event.preventDefault();

  // Get form data
  running.val();
  distance.val();
  duration.val();

  // Validate data (Ensure data is integer and valid)
  if (isNaN(parseFloat(distance)) || isNaN(parseFloat(duration))) {
    return;
  }

  // Generate new workout obj
  var newWorkout = {
    type: type,
    distance: parseFloat(distance),
    duration: parseFloat(duration),
    timestamp: dayjs().format('MMMM D'),
    lat: parseFloat(lat),
    lng: parseFloat(lng),
  };

  // Add new workout obj to workouts array
  workouts.push(newWorkout);

  // Save to local storage
  localStorage.setItem('workouts', JSON.stringify(workouts));

// Mark new workout on map
renderWorkoutOnMap(newWorkout);

// Add workout on the workout list
renderWorkoutOnList(newWorkout);
}

  ///ClearForm//

  // Wait for content to load first//
  document.addEventListener('DOMContentLoaded', function () {

    // Get the form and reset button elements
    var form = document.querySelector('.form-bg');
    var resetButton = document.querySelector('.reset-btn');

// Event listener for reset button
// resetButton.addEventListener('click', function (event) {
//   // Prioritize resetting form by preventing default function
//   event.preventDefault();
//   // Reset the form fields
//   form.reset();
// });

// ------WeatherApp------
// Your API key from OpenWeatherMap
const apiKey = "ab16215a13fcb8cbd052044053143685";
let modal;

function fetchWeatherData(lat, lon) {
  const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`;

  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      // Process data 
      displayWeatherModal(data);
    })
    .catch(error => console.error('Error fetching weather data:', error));
}

function displayWeatherModal(weatherData) {
  // Call weather information from the response
  const temperature = weatherData.list[0].main.temp;
  const description = weatherData.list[0].weather[0].description;

  // Create a modal element
  modal = document.createElement("div");
  modal.classList.add("modal");

  // Populate modal content with weather information
  modal.innerHTML = `
    <div class="modal-content">
      <span class="close-btn">&times;</span>
      <p>Temperature: ${temperature} K</p>
      <p>Description: ${description}</p>
    </div>
  `;

  // Append modal to the body
  document.body.appendChild(modal);

  // Display modal
  modal.style.display = 'block';

  // Add event listener to close the modal
  const closeBtn = modal.querySelector('.close-btn');
  closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
  });
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
