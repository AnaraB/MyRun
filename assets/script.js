//save reference to import DOM elements
var currentDayEl = $('#currentDay');
var running = $('.select-type');
var distance = $('.input-distance');
var duration = $('.input-duration');
var myWorkoutForm = $('.form-element');
var submitMyWorkout = $('.submitWorkout');
var form = document.getElementsByClassName("form-element")[0];

// global variables
let map;

let workouts = [];
let lat;
let lng;

//get position
if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(
    function (position) {
      //if position is available load map
      loadMap(position)
    },

    function () {
      alert('Could not get your position');
    }
  )

}


function loadMap(position) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;

  const coords = [latitude, longitude];
  //store result of set map in the map variable
  map = L.map('map').setView(coords, 16);

  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map);

  //add eventListener created by leflet library, it listens to click event on the map
  map.on('click', function (mapEvent) {
    //get coordinates of the point where it was clicked
    lat = mapEvent.latlng.lat;
    lng = mapEvent.latlng.lng;
    //create array to store lattitude and longitude
    const workoutCoords = [lat, lng];
    renderWorkoutMarker(workoutCoords);
    distance.focus();

  })


}



function renderWorkoutMarker(workoutCoords) {

  L.marker(workoutCoords)
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

}


//////////////---------FORM submission -----///////////////////////////

let newWorkout;

function handleFormSubmit(event) {
  event.preventDefault();

  // Get form data
var type = $('#autoSizingSelect').val();
var distance = $('#autoSizingInput').val();
var duration = $('#autoSizingInputGroup').val();


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

  // Add marker to the map based on lat/lng
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
    .setPopupContent(`Distance: ${newWorkout.distance} km<br>Duration: ${newWorkout.duration} mins`)
    .openPopup();

  // Render the workout on the list
  renderWorkout(newWorkout);
}


//event listener for submission//
myWorkoutForm.on('submit', handleFormSubmit);


function renderWorkout(workout) {
  let html = `
    <li class="workout workout-running" data-id="" id="worktype">
      <h2 class="workout-title">${workout.type}</h2>
      <div class="workout-details">
        <span class="workout-icon">🏃‍♂️</span>
        <span class="workout-value">${workout.distance}</span>
        <span class="workout-unit">km</span>
      </div>
      <div class="workout-details">
        <span class="workout-icon">⏱</span>
        <span class="workout-value">${workout.duration}</span>
        <span class="workout-unit">min</span>
      </div>
      </li>
  `;
  form.insertAdjacentHTML('afterend', html);
}


//----------------LOCAL STORAGE----------------------//

function getDataFromLocalStorage() {
  const data = JSON.parse(localStorage.getItem('workouts'));

  if (!data) return;
  workouts = data;
  workouts.forEach(workout => {
    renderWorkout(workout);
  });
}


//----- clear storage----
// Event listener for the "Yes" button in the modal to clear local storage
$('.clearLocalStorageBtn').on('click', function () {
  // Call the function to clear local storage
  clearLocalStorage();
});

// Function to clear local storage
function clearLocalStorage() {
  // Clear local storage
  localStorage.removeItem('workouts');
  // Delete all workout markers from the map
  map.eachLayer(function (layer) {
    if (layer instanceof L.Marker) {
      map.removeLayer(layer);
    }
  });
  // Clear the rendered workout list
  $('#worktype',).empty();
}




// // Reset list, confirmation form modal window. If "yes" button is clicked 
// $('.clearLocalStorageBtn').on('click', function () {

//   // function to clear local storage
//   clearLocalStorage();
// });

// // Event listener when user clicks yes button to confirm to reset workouts
// clearAllWorkouts.on('click', function () {
//   //clear local storage 
//   localStorage.removeItem('workouts');
//   // delete all workouts from map
//   map.eachLayer(function (layer) {
//     if (layer instanceof L.Marker) {
//       map.removeLayer(layer);
//     }
//   });

//   //delete workout list 
//   workoutdetailsdiv.innerHTML = '';
// });


//------------------------DISPLAY CURRENT TIME-----------------//

//handle displaying the time
function displayCurrentTime() {
  let rightNow = dayjs().format('DD/MM/YYYY');
  currentDayEl.text(rightNow);
}

// display currentTime
setInterval(displayCurrentTime, 1000);




////////////////////////// fetching API's /////////////////////////////

// get randow QUOTE FOR INSPIRATION modal window
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


// get any  CITY WEATHER FORECAST in weather modal

const apikey = "379f54c3553fa3935a559271241c0049";

const weatherDataEl = $("#weather-data"); // Select the element with ID "weather-data"

const cityInputEl = $("#city-input"); // Select the element with ID "city-input"

const formEl = $("#weatherForm"); // Select the form element

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
