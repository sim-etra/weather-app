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
}

let apiKey = "d0f1f61addef481963fc463729e402e0";
let city = "New York";
let units = "metric";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;

axios.get(apiUrl).then(displayTemperature);
