# MyRun

Application to record running or cycling workouts

Project MyRun
This project is the production of an app called ‘MyRun’. This app logs a user’s running activity and stores it in their local storage.

The app was designed as part of a project work by Aygerim, Eyram, Teddy and Esther on the Front-end web developer bootcamp. The app will be maintained by the collaborators.

The idea of creating this app came from the need for a reporting app for user's running activity. In the app, the user is presented with the ability to record the running activity that they have undertaken, including the distance covered and the time spent on the activity. In the app, locations are marked with markers on the map.

The app has a split layout with an interactive map spanning its right side, and a toolbar to its left side. The app shows the date in real time and provides self explanatory information on its usage.

The app uses 3 icons to depicts the reset, inspirational quotes and weather buttons which provides the user with opportunities to reset the activity entry field, as well as checking the weather in their current location.
The user also benefits from randomly selected inspirational quotes with the aim of adding colour to their day. The app uses a wide range of colours which has been carefully selected to cheer up the user.

Upon restart of the app, it asks for consent to use the user’s location. When the user grants consent, they can enjoy the full benefits of the app which includes recognition of their location and the ability to mark their run distance. The app stores the user’s consent to share their location and will re-request the user’s consent if their cache is cleared.

The app also has an added advantage of the weather feature. It can summarise the weather of any UK location of the user’s choice. The user is presented with the ability to select the location using the weather button. The weather of the chosen location is given in one click. This feature is easy to use and can be extremely beneficial to the user.

***User Story*** <br />
As a user, I want to log my running workouts with location, distance and  time, so I can keep a log of all my running  activities.

As a user, I want to see all my workouts at a glance, so I can easily track my progress over time.

As a user, I want also see my workouts on a map, so I can easily check where I work out the most.

**Features**

- Workout Tracking: Users can input details of their workouts, including type (running or cycling), distance, and duration.

- Geolocation: Users can click on a map to save the location of their workouts.

- Workout Visualization: Workouts are displayed on a map using markers, providing a visual          representation of the user's activities.

- Local Storage: User data is stored locally, allowing users to access their workout history even after closing the application.

- Motivational Quotes: Users can receive inspirational quotes to keep them motivated during their workouts.

- Weather Forecast: Users can check the current weather forecast for a specific city to plan their outdoor activities accordingly.

**Technologies Used**

- HTML
- CSS
- JavaScript
- jQuery
- Bootstrap

  APIs:
- Leaflet: Interactive mapping library for displaying workout locations on a map.
- Day.js: Library for manipulating dates and times, used for displaying the current date and time.
- OpenWeatherMap API: Provides current weather data for a specific city, used to display weather forecasts.
- Quotable API: Provides random quotes for inspiration, used to display motivational quotes.

**Installation**

To run the MyRun web application locally, follow these steps:

Clone the repository: git clone  https://github.com/AnaraB/MyRun.git
Navigate to the project directory: cd MyRun
Open the index.html file in a web browser.

**Usage**

Upon loading the application, users can input details of their workouts in the provided form fields.
Users can click on the map to save the location of their workouts.
Motivational quotes can be accessed by clicking the "Get a quote" button.
Users can check the current weather forecast for a specific city by entering the city name and clicking the "Get Weather" button.

**Demo**

The following image demonstrates the web application's appearance and functionality:
 ![demo of app, map with sidebar to log running workouts](image-1.png)


 **Customization**

 Customize MyRun application by:

- Modifying the HTML structure and content in index.html to change the layout or add/remove elements.

- Adjusting the styling rules in style.css to change the visual appearance of the application.

- Editing the JavaScript code in script.js to modify application functionality or integrate with different APIs.

**Deployment**

Deployed link: <https://anarab.github.io/MyRun/>

**Contributors**
- Aygerim
- Teddy
- Esther
- Eyram

**License**

Copyright (c) 2024 Aygeraberda

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

