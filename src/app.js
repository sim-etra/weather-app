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

function displayForecast() {
  let forecastElement = document.getElementById("forecast");

  let forecastHTML = `<div class="row">`;
  days = ["Mon", "Tue", "Wed"];
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `
            <div class="col-2">
              <div class="forecast-date">${day}</div>
              <img
                src="file:///C:/Users/Diana/SheCodes/weather-app/svg/03n.svg"
                alt="Bootstrap"
                width="40"
                height="40"
              />
              <div class="forecast-temp">
                <span class="forecast-temp-max">25°</span>
                <span class="forecast-temp-min">16°</span>
              </div>
            </div>
          `;
  });

  forecastHTML = forecastHTML + `</div>`;

  forecastElement.innerHTML = forecastHTML;
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
  let iconDisplay = document.getElementById("icon");
  let iconId = response.data.weather[0].icon;
  iconDisplay.setAttribute("src", `svg/${iconId}.svg`);
  if (
    iconId === "01n" ||
    iconId === "02n" ||
    iconId === "11d" ||
    iconId === "11n"
  ) {
    iconDisplay.setAttribute("class", "filter-night");
  }
  if (iconId === "01d" || iconId === "02d") {
    iconDisplay.setAttribute("class", "filter-sun");
  }
  if (
    iconId === "03d" ||
    iconId === "03n" ||
    iconId === "04d" ||
    iconId === "04n"
  ) {
    iconDisplay.setAttribute("class", "cloud-filter");
  }
  if (
    iconId === "09d" ||
    iconId === "09n" ||
    iconId === "10d" ||
    iconId === "10n"
  ) {
    iconDisplay.setAttribute("class", "rain-filter");
  }
  if (
    iconId === "13d" ||
    iconId === "13n" ||
    iconId === "50d" ||
    iconId === "50n"
  ) {
    iconDisplay.setAttribute("class", "snow-filter");
  }
}

function search(city) {
  let apiKey = "d0f1f61addef481963fc463729e402e0";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(displayTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let inputValue = document.getElementById("form-input");
  search(inputValue.value);
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

search("Kyiv");
displayForecast();
