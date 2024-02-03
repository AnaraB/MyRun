//save reference to import DOM elements
let currentDayEl = $('#currentDay');

// global variables
let latitude;
let longitude;

//get position
if (navigator.geolocation)
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



//handle displaying the time
function displayCurrentTime() {
  let rightNow = dayjs().format('dddd, MMMM D');
  currentDayEl.text(rightNow);
}


// display currentTime
setInterval(displayCurrentTime, 1000);


// ----------------------WorkOut-----------------------------------// 

//Workout Array objects//
var workouts = [];

// Load workouts from local storage//
if (localStorage.getItem('workouts')) {
  workouts = JSON.parse(localStorage.getItem('workouts'));
  workouts.forEach(function (workout) {
    renderWorkoutOnMap(workout);
    renderWorkoutOnList(workout);
  });
}

// Form submission function
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



  ///ClearForm//

  // Wait for content to load first//
  document.addEventListener('DOMContentLoaded', function () {

    // Get the form and reset button elements
    var form = document.querySelector('.form-bg');
    var resetButton = document.querySelector('.reset-btn');

    // Event listener for reset button
    resetButton.addEventListener('click', function (event) {

      // Prioritise resetting form by preventing defualt function
      event.preventDefault();

      // Reset the form fields
      form.reset();
    });
  })



