function formatDate(timestamp) {
  let currentDate = new Date(timestamp);
  let hour = currentDate.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  let minutes = currentDate.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let day = days[currentDate.getDay()];
  return `${day} ${hour}:${minutes}`;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let day = days[date.getDay()];
  return day;
}

function displayForecast(response) {
  let forecastElement = document.getElementById("forecast");
  let forecast = response.data.daily;

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (day, index) {
    if (index < 6) {
      forecastHTML += `
            <div class="col-2">
              <div class="forecast-date">${formatDay(day.dt)}</div>
              <img
                src="svg/${day.weather[0].icon}.svg"
                alt="Bootstrap"
                width="40"
                height="40"
                
              />
              <div class="forecast-temp">
                <span class="forecast-temp-max">${Math.round(
                  day.temp.max
                )}°</span>
                <span class="forecast-temp-min">${Math.round(
                  day.temp.min
                )}°</span>
              </div>
            </div>
          `;
    }
  });

  forecastHTML += `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coords) {
  let apiKey = "215576bab28022db35e6e64f040e1b56";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coords.lat}&lon=${coords.lon}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayForecast);
}

function displayTemperature(response) {
  celsiusTemperature = response.data.main.temp;

  document.getElementById("temperature").innerHTML =
    Math.round(celsiusTemperature);
  document.getElementById("city").innerHTML = response.data.name;
  document.getElementById("description").innerHTML =
    response.data.weather[0].description;
  document.getElementById("humidity").innerHTML = response.data.main.humidity;
  document.getElementById("wind-speed").innerHTML = response.data.wind.speed;
  document.getElementById("date").innerHTML = formatDate(
    response.data.dt * 1000
  );

  document
    .getElementById("icon")
    .setAttribute("src", `svg/${response.data.weather[0].icon}.svg`);

  getForecast(response.data.coord);
}

function search(city) {
  let apiKey = "215576bab28022db35e6e64f040e1b56";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let inputValue = document.getElementById("form-input");
  search(inputValue.value);
}

function displayPosition(position) {
  let apiKey = "215576bab28022db35e6e64f040e1b56";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemperature);
}

function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(displayPosition);
}

function displayCelsiusTemperature(event) {
  event.preventDefault();

  document.getElementById("temperature").innerHTML =
    Math.round(celsiusTemperature);

  fahrenheitLink.classList.remove("active");
  celsiusLink.classList.add("active");
}

function displayFahrenheitTemperature(event) {
  event.preventDefault();
  document.getElementById("temperature").innerHTML = Math.round(
    (celsiusTemperature * 9) / 5 + 32
  );

  fahrenheitLink.classList.add("active");
  celsiusLink.classList.remove("active");
}

let celsiusTemperature = null;

let celsiusLink = document.getElementById("celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);

let fahrenheitLink = document.getElementById("fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

document.getElementById("search-form").addEventListener("click", handleSubmit);
document
  .getElementById("gps-search")
  .addEventListener("click", getCurrentPosition);

search("Kyiv");
