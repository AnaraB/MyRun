//save reference to import DOM elements
let currentDayEl = $('#currentDay');
let workoutdetailsdiv = document.getElementById("workoutdetails")

// global variables
let latitude;
let longitude;

//get position
if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(
    function (position) {
      // console.log(position);
      latitude = position.coords.latitude;
      longitude = position.coords.longitude;

      const coords = [latitude, longitude];

      //store result of set map in the map variable
      const map = L.map('map').setView(coords, 16);

      L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(map);



      //add eventListener created by leflet library, it listens to click event on the map
      map.on('click', function (mapEvent) {
        //get coordinates of the point where it was clicked
        const lat = mapEvent.latlng.lat;
        const lng = mapEvent.latlng.lng;
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

// Event listener for reset button
resetButton.addEventListener('click', function (event) {

  // Prioritize resetting form by preventing default function
  event.preventDefault();

  // Reset the form fields
  form.reset();
});


//---------------WeatherAPi------------