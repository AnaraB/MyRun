//save reference to import DOM elements
let currentDayEl = $('#currentDay');

// global variables
let latitude;
let longitude;

//get position
if(navigator.geolocation)
  navigator.geolocation.getCurrentPosition(
   function(position){
    console.log(position);
    latitude = position.coords.latitude;
    longitude = position.coords.longitude;

    console.log(latitude);
    console.log(longitude);
   }, 
   function(){
   alert('Could not get your position');
  }
  )



function loadMap (){
  const map = L.map('map').setView([51.505, -0.09], 13);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

L.marker([51.5, -0.09]).addTo(map)
    .bindPopup('Workout date and type')
    .openPopup();

}

loadMap();




//handle displaying the time
function displayCurrentTime() {
  let rightNow = dayjs().format('dddd, MMMM D');
  currentDayEl.text(rightNow);
}




// display currentTime
setInterval(displayCurrentTime, 1000);