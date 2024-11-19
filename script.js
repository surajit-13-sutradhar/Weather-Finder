document.addEventListener('DOMContentLoaded', () => {
    const cityInput = document.getElementById("cityInput")
    const getWeatherButton = document.getElementById("getWeatherButton")

    const weatherInfo = document.getElementById("weatherInfo")
    const cityName = document.getElementById("cityName")
    const temperature = document.getElementById("temperature")
    const feelsLikeTemperature = document.getElementById("feelsLikeTemperature")
    const description = document.getElementById("description")
    const windSpeed = document.getElementById("windSpeed")
    const atmosphericPressure = document.getElementById("atmosphericPressure")
    const icon = document.getElementById("icon")

    const error = document.getElementById("errorMessage")

    const API_KEY = "8e626b71fabe37f19581e52c85fb08a6" //store in env variables
    

    getWeatherButton.addEventListener("click", async () => {
        const city = cityInput.value.trim()
        if(!city) return
        
        // server/database is always in another continent so we have to wait a little to get te data
        try {
            const weatherData = await fetchWeatherData(city) //'await' has no effect on the type of this expression. Because "fetchWeatherData" is a synchronous function
            displayWeatherData(weatherData)
            // Refer to "https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API" to learn about fetchAPI

        } catch (error) {
            showError()
        }
    })


    // Functions should be really atomic i.e. one function for one role
    
    async function fetchWeatherData(city) {   // But once we make this async the error no longer is there
        //gets the data 
        const URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`
        try{
            const response = await fetch(URL)
            // console.log(typeof response) //object
            // console.log(response)

            // Throwing Error
            if(!response.ok){
                throw new Error(`Response status: ${response.status}`)
            }
            const jsonData = await response.json()
            return jsonData
            // console.log(json);
        } catch (error) {
            console.error(error.message);
        }

    }

    function displayWeatherData(data){
        // display the data
        console.log(data)
        const {name, main, wind, weather} = data  //name: string, main: object, weather: array

        weatherInfo.classList.remove("hidden")
        error.classList.add("hidden")

        cityName.innerText = name
        temperature.innerText = `Temperature:${main.temp}°`
        feelsLikeTemperature.innerText = `Feels like: ${main.feels_like}°`
        description.innerText = `Description: ${weather[0].description}`
        windSpeed.innerText = `Wind speed: ${wind.speed} kmph`
        atmosphericPressure.innerText = `Atmospheric pressure: ${main.pressure} millibars`
        
        const iconImage = weather[0].icon
        icon.innerHTML = `<img src="https://openweathermap.org/img/wn/${iconImage}@2x.png" alt="Weather icon">`;
    }

    function showError(weatherInfo){
        weatherInfo.classList.add("hidden")
        error.classList.remove("hidden")
    }
})


  