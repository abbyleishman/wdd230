// select elements that will be changed with api

const currentTemp = document.querySelector('#current-temp');
const weatherIcon = document.querySelector('#weather-icon');
const captDescr = document.querySelector('figcaption');

const url = "https://api.openweathermap.org/data/2.5/weather?q=Fairbanks&units=imperial&appid=a3e2c6c0eadde7523f38fd8317cda6a7";

async function apiFetch(){
    try{
        const response = await fetch(url);
        if(response.ok){
            const data = await response.json();
            console.log(data); //this is for testing the call
            displayResults(data);
        }else{
            throw Error(await response.text());
        }

    }catch(error){
        console.log(error);
    }
}

function displayResults(weatherData){
   currentTemp.innerHTML=`<strong>${weatherData.main.temp.toFixed(0)}</strong>`;

    const iconsrc = `https://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`;
    const description = weatherData.weather[0].description.toLowerCase();
    const capDescription = description.split(" ").map(word => {
        let firstLetter = word.charAt(0).toUpperCase();
        return`${firstLetter}${word.slice(1)}`;
    }).join(" ");

    weatherIcon.setAttribute('src',iconsrc);
    weatherIcon.setAttribute('alt',description);
    captDescr.textContent=(capDescription);

}
apiFetch();
