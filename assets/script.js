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
    //create array to store lattitude and longitude
    const coords = [latitude, longitude];
    
  //store result of set map in the map variable
    const map = L.map('map').setView( coords, 16);

  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map);

  L.marker(coords)
      .addTo(map)
      .bindPopup('I am here')
      .openPopup();

   }, 
   function(){
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