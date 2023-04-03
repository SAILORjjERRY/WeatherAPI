/* JS Script

   API key: "7356bd9abb6072e8a4adc96cb3309e9a"


*/

/* Vuodenaika funktio;
   Tulostuu rivin 20 muotoon */

   function dateShow(d) {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  
    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();
  
    return `${day}, ${date} ${month} ${year}`;
  }
  
  let now = new Date();
  let date = document.querySelector('.location .date');
  date.innerText = dateShow(now);
  
  /* Hakukenttä + Enter-nappulalle toiminto */
  const searchbox = document.querySelector('.search-box');
  searchbox.addEventListener('keypress', setQuery);
  
  function setQuery(evt) {
    if (evt.keyCode == 13) {
      getResults(searchbox.value);
    }
  }
  
  /* Hakee openweatherista api key:llä tulokset */
  function getResults(query) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${query}&units=metric&APPID=7356bd9abb6072e8a4adc96cb3309e9a`)
      .then(data => {
        return data.json();
      }).then(displayResults);
  }
  
  
  /* Esittää saadut tulokset > Kaupunki, ISO 3166 standardin mukainen maatunnus >
     Lämpötila >
     Sään kuvaus >
     Matalin ja korkein lämpötila
  */
  function displayResults(data) {
    let city = document.querySelector('.location .city');
    city.innerText = `${data.name}, ${data.sys.country}`;
  
    let temp = document.querySelector('.current .temp');
    temp.innerHTML = `${Math.round(data.main.temp)}<span>°c</span>`;
  
    let feelsLike = document.querySelector('.feelslike');
    feelsLike.innerText = `\n Feels like: 
    ${Math.round(data.main.feels_like)} °c`;
  
    let weatherDescription = document.querySelector('.current .weather');
    weatherDescription.innerText = data.weather[0].main;
  
    let HiAndLow = document.querySelector('.hi-low');
    HiAndLow.innerText = `\n Lowest point in ${data.name} is ${data.main.temp_min}°c
    and highest point is ${data.main.temp_max}°c`;
  
  }
  
  
  