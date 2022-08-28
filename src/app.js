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

function displayTemperature(response) {
  document.getElementById("temperature").innerHTML = Math.round(
    response.data.main.temp
  );
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

let apiKey = "d0f1f61addef481963fc463729e402e0";
let city = "Kyiv";
let units = "metric";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;

axios.get(apiUrl).then(displayTemperature);
