//save reference to import DOM elements
let currentDayEl = document.getElementById('currentDay');



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