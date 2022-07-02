const app = {
  init: () => {
    document
      .getElementById("get-btn")
      .addEventListener("click", app.fetchWeather);
    document;
    document
      .getElementById("btn-location")
      .addEventListener("click", app.getLocation);
  },
  fetchWeather: async (ev) => {
    let lat = document.getElementById("latitude").value;
    let lon = document.getElementById("longitude").value;
    let key = "12ee4f5bcb00772750c7bab12d398c3d";
    let lang = "en";
    let units = "metric";
    let url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${key}&units=${units}&lang=${lang}`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        for (i = 0; i < 5; i++) {
          j = i+6
          document.getElementById("min-degree-day" + (i + 1)).innerHTML =
            Number(data.list[i].main.temp_min).toFixed(1) + "°";
        }

        for (i = 0; i < 5; i++) {
          j = i+6
          document.getElementById("max-degree-day" + (i + 1)).innerHTML =
            Number(data.list[i].main.temp_max).toFixed(1) + "°";
        }
      });
  },
  getLocation: (ev) => {
    let opts = {
      enableHighAccuracy: true,
      timeout: 1000 * 10,
      maximumAge: 1000 * 60 * 5,
    };
    navigator.geolocation.getCurrentPosition(app.success, app.failure, opts);
  },
  success: (position) => {
    document.getElementById("latitude").value =
      position.coords.latitude.toFixed(2);
    document.getElementById("longitude").value =
      position.coords.longitude.toFixed(2);
  },
  failure: (err) => {
    console.error(err);
  },
};
app.init();
let d = new Date();
let weekday = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

function CheckDay(day) {
  if (day + d.getDay() > 6) {
    return day + d.getDay() - 7;
  } else {
    return day + d.getDay();
  }
}

for (i = -1; i < 5; i++) {
  document.getElementById("day" + (i + 1)).innerHTML = weekday[CheckDay(i)];
}
