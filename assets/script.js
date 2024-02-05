//save reference to import DOM elements
let currentDayEl = $('#currentDay');
let workoutdetailsdiv = document.getElementById("workoutdetails")

// global variables
let lat;
let lng;
let map;

// Page Load markers from prevs workout//
function loadPrevsMrk() {

  //loop through local storage for prevs marker cords
  let prevsWorkOuts = localStorage.getItem("workouts")
  
  console.log(prevsWorkOuts)

 // Iterate through each workout in localStorage
 prevsWorkouts.forEach(function (workout) {
  // Extract latitude and longitude from workout data
  const lat = workout.lat;
  const lng = workout.lng;

  //on each for loop iteration add marker to the map based on lat/lng depending on form data


  //grab add marker to map code



}

loadPrevsMrk()


//get position
if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(
    function (position) {
      // console.log(position);
      latitude = position.coords.latitude;
      longitude = position.coords.longitude;

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

      })

    },
    function () {
      alert('Could not get your position');
    }
  )
}


//handle displaying the time
function displayCurrentTime() {
  let rightNow = dayjs().format('dddd, MMMM D');
  currentDayEl.text(rightNow);
}


// display currentTime
setInterval(displayCurrentTime, 1000);


// ----------------------WorkOut-----------------------------------// 
function renderWorkoutOnMap(workouts) {

};

// Call the render functions with the sample workout
let workoutsElement = document.querySelector('.workouts');
let div = document.createElement("div");
div.classList.add("workout-item");

function renderWorkoutOnlist(workouts) {

  let div = document.createElement("div")
  let workout_type_para
    = document.createElement("p")
  workout_type_para.innerHTML = "Activity type: " + workouts.type

  let workout_distance_para
    = document.createElement("p")
  workout_distance_para.innerHTML = "Distance " + workouts.distance
  div.append(workout_type_para, workout_distance_para)

  let workout_Duration_para
    = document.createElement("p")
  workout_Duration_para.innerHTML = "Time " + workouts.duration
  div.append(workout_type_para, workout_distance_para, workout_Duration_para)

  workoutdetailsdiv.append(div)

}

//Workout Array objects//
var workouts = [];

// Load workouts from local storage//
if (localStorage.getItem('workouts')) {
  workouts = JSON.parse(localStorage.getItem('workouts'));
  workouts.forEach(function (workout) {
    renderWorkoutOnlist(workout);
  });
}

//----------------------Form submission ------------------------//
//event listener for submission//
var form = document.querySelector('.form-bg');
form.addEventListener('submit', handleFormSubmit);

function handleFormSubmit(event) {
  event.preventDefault();

  // Get form data
  var type = document.getElementById('autoSizingSelect').value;
  var distance = document.getElementById('autoSizingInput').value;
  var duration = document.getElementById('autoSizingInputGroup').value;


  // Validate data (Ensure data is interger and valid)
  if (isNaN(parseFloat(distance)) || isNaN(parseFloat(duration))) {
    return;
  }

  // Generate new workout obj//
  var newWorkout = {
    type: type,
    distance: parseFloat(distance),
    duration: parseFloat(duration),
    timestamp: dayjs().format('MMMM D'),
    lat: parseFloat(lat),
    lng: parseFloat(lng),
  };

  // Add new workout obj workouts array
  workouts.push(newWorkout);

  // Save to local storage
  localStorage.setItem('workouts', JSON.stringify(workouts));

  // Mark new workout on map
  // renderWorkoutOnMap(newWorkout);

}

// Get the reset button element
var resetButton = document.querySelector('.reset-btn');

// // Event listener for reset button
// resetButton.addEventListener('click', function (event) {//

//   // Prioritize resetting form by preventing default function
//   event.preventDefault();

//   // Reset the form fields
//   form.reset();
// });

//------WeatherApp------//
// Your API key from OpenWeatherMap
const apiKey = "ab16215a13fcb8cbd052044053143685"
let modal;

// map variable 
// let map;


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
  // call weather information from the response
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

// Fetch weather data and display in modal
map.on('click', function (mapEvent) {
  const lat = mapEvent.latlng.lat;
  const lng = mapEvent.latlng.lng;
  const workoutsCoords = [lat, lng];

  // Display workout marker on the map
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

  // Fetch weather data and display in modal
  fetchWeatherData(lat, lng);
});
