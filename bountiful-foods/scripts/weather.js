const weatherContainer = document.querySelector('.weather-container');
const urlForecast =
  'https://api.openweathermap.org/data/2.5/forecast?q=Carlsbad&units=metric&cnt=32&appid=2d629600d5bfa1d7dd6b51230f324221';
const urlCurrent =
  'https://api.openweathermap.org/data/2.5/weather?q=Carlsbad&units=metric&appid=2d629600d5bfa1d7dd6b51230f324221';

  function displayWeather(weather){
    let article = document.createElement('article');
    article.innerHTML=`
        <h3 class='weather-title'>${weather.title}</h3>
        <div class='weather-img'>
            <picture>
                <img src='${`https://openweathermap.org/img/wn/${weather.icon}@2x.png`}' width='100' height='100' alt='Weather image for ${weather.title}'>
            </picture>
            <p>${weather.temp} °C</p>
        </div>
        <div class='weather-info'>
            <p>${weather.description}</p>
            <p>Humidity: ${weather.humidity}%</p>
        </div>
    `;
    weatherContainer.appendChild(article);
  }

async function apiFetch() {
  try {
    const responseForecast = await fetch(urlForecast);
    const responseCurrent = await fetch(urlCurrent);
    if (responseForecast.ok && responseCurrent.ok) {
      const dataForecast = await responseForecast.json();
      const dataCurrent = await responseCurrent.json();
      const currentForecast ={
        title: 'Current Weather',
        temp: dataCurrent.main.temp,
        description: dataCurrent.weather[0].description,
        icon: dataCurrent.weather[0].icon,
        humidity: dataCurrent.main.humidity,
      }
      const forecastDay1 = {
        title: 'Forecast Day 1',
        temp: 0,
        description: '',
        icon: '',
        humidity: 0,
      };
      const forecastDay2 = {
        title: 'Forecast Day 2',
        temp: 0,
        description: '',
        icon: '',
        humidity: 0,
      };
      const forecastDay3 = {
        title: 'Forecast Day 3',
        temp: 0,
        description: '',
        icon: '',
        humidity: 0,
      };
      dataForecast.list.forEach((element, index) => {
        if (index == 8) {
          forecastDay1.title=`Forecast for ${element.dt_txt.split(' ')[0].split('-').join('/')}`
            forecastDay1.temp = element.main.temp
            forecastDay1.description = element.weather[0].description
            forecastDay1.icon = element.weather[0].icon
            forecastDay1.humidity = element.main.humidity
        }else if(index===16){
          forecastDay2.title=`Forecast for ${element.dt_txt.split(' ')[0].split('-').join('/')}`
            forecastDay2.temp = element.main.temp
            forecastDay2.description = element.weather[0].description
            forecastDay2.icon = element.weather[0].icon
            forecastDay2.humidity = element.main.humidity
        }else if (index===24){
          forecastDay3.title=`Forecast for ${element.dt_txt.split(' ')[0].split('-').join('/')}`
            forecastDay3.temp = element.main.temp
            forecastDay3.description = element.weather[0].description
            forecastDay3.icon = element.weather[0].icon
            forecastDay3.humidity = element.main.humidity
        }
      });
      const weathers=[currentForecast, forecastDay1, forecastDay2, forecastDay3];
      weathers.forEach((weather)=>{
        displayWeather(weather);
      })
    } else {
      throw Error(await response.text());
    }
  } catch (error) {
    console.log(error);
  }
}

apiFetch();