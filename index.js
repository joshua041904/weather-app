const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const error404 = document.querySelector('.not-found');
const convertButton = document.getElementById('convert-button');

let tempInCelsius;
//keeps track of whether celsius or fahrenheit is being displayed
//celsius is displayed by default
let isCelsius = true; 

//converts celsius to fahrenheit
function toFahrenheit(celsius){
   let fahrenheit = (celsius * 9/5) + 32;
   return fahrenheit;
}

//convert km to miles
function toMiles(km){
   let miles = km * 0.621371;
   return miles;
}

//displays fetched data on the screen
function displayWeather(json){
    const image = document.querySelector('.weather-box img');
    const temperature = document.querySelector('.weather-box .temperature');
    const description = document.querySelector('.weather-box .description');
    const humidity = document.querySelector('.weather-details .humidity span');
    const wind = document.querySelector('.weather-details .wind span');

    switch (json.weather[0].main) {
        case 'Clear':
            image.src = 'images/sun-solid.svg';
            break;
        case 'Rain':
            image.src = 'images/cloud-showers-heavy-solid.svg';
            break;
        case 'Snow':
            image.src = 'images/snowflake-solid.svg';
            break;
        case 'Clouds':
            image.src = 'images/cloud-solid.svg';
            break;
        case 'Haze':
            image.src = 'images/smog-solid.svg';
            break;
        default:
            image.src = '';
    }

    tempInCelsius = json.main.temp;

    temperature.innerHTML = `${parseInt(tempInCelsius)}<span>°C</span>`;
    description.innerHTML = `${json.weather[0].description}`;
    humidity.innerHTML = `${json.main.humidity}%`;
    wind.innerHTML = `${parseInt(toMiles(json.wind.speed))} mph`;


    weatherBox.style.display = '';
    weatherDetails.style.display = '';
    weatherBox.classList.add('fadeIn');
    weatherDetails.classList.add('fadeIn');
    container.style.height = '670px';
}

search.addEventListener('click', () => {
   const APIKey = '3f8567a3af79841794506d338b7d64ad';
   const city = document.querySelector('.search-box input').value;


   if (city === '') {
       return;
   }

   //fetch weather data from API
   fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`)
       .then(response => response.json())
       .then(json => {

           if (json.cod === '404') {
               container.style.height = '400px';
               weatherBox.style.display = 'none';
               weatherDetails.style.display = 'none';
               error404.style.display = 'block';
               error404.classList.add('fadeIn');
               return;
           }

           error404.style.display = 'none';
           error404.classList.remove('fadeIn');

           displayWeather(json)
       });
});


convertButton.addEventListener('click', () => {

    const temperature = document.querySelector('.weather-box .temperature');

    //if we want to convert to fahrenheit
    if(isCelsius){
        const tempInFahrenheit = toFahrenheit(tempInCelsius);
        temperature.innerHTML = `${parseInt(tempInFahrenheit)}<span>°F</span>`;
        convertButton.innerText = 'Convert to Celsius';
    }
    //if we want to convert to celsius
    else{
        temperature.innerHTML = `${parseInt(tempInCelsius)}<span>°C</span>`;
        convertButton.innerText = 'Convert to Fahrenheit'; 
    }

    //update isCelcius
    //testing
    isCelsius = !isCelsius;
 });

