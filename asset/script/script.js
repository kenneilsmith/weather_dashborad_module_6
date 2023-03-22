
// Global Variables
var apiKey = "fba023ca6e5dbd4a7e2aa022e0fb15e6"
var searchInput = $('#search-input')
var searchButton = $('#search-button')
var weatherIconURL = 'https://openweathermap.org/img/wn/'
var longitude = 0
var latitude = 0


// function that converts celsius to fahrenheit
function celsiusToFahrenheit(celsius) {
    var fahrenheit = Math.round((celsius * 9 / 5) + 32);
    return fahrenheit;
}

// function that converts kph to mph
function kphToMph(kph) {
    var mph = Math.round(kph / 1.60934);
    return mph;
}

//function that gets the local weather based on the location of the user
function getLocalWeatherWithLongLat() {
    //getting the longitude and latitude of the user
    navigator.geolocation.getCurrentPosition(function (locationdata) {
        longitude = locationdata.coords.longitude
        latitude = locationdata.coords.latitude
        // pass the longitude and latitude to the open weather map api
        var weatherMapURL = "http://api.openweathermap.org/data/2.5/weather?lat=" + latitude + "&lon=" + longitude + "&appid=" + apiKey + "&units=metric"
        // get the data from the api
        $.get(weatherMapURL).then(function (data) {
            //get the data and set the text of the html elements then append them to the page
            $('#city-name').text(data.name)
            var temp = data.main.temp
            var tempF = celsiusToFahrenheit(temp)
            $('#current-temp').text(tempF + '°F')
            $('#current-humidity').text('Humidity: ' + data.main.humidity + '%')
            $('#current-wind-speed').text('Wind: ' + kphToMph(data.wind.speed) + ' MPH')
            //get the current date and convert to localeDateString and set the text of the html element then append it to the page
            var date = new Date();
            $('#current-date').text(date.toLocaleDateString())
            $('#current-weather-description').text(data.weather[0].description)

            //get the weather icon from the api and setting it to the src of the html element 
            $('#current-weather-icon').attr('src', weatherIconURL + data.weather[0].icon + '@2x.png')

        })
    })
}

//function that gets the weather forecast based on the location of the user
function getLocalWeatherForecastWithLongLat() {
    navigator.geolocation.getCurrentPosition(function (locationdata) {
        longitude = locationdata.coords.longitude
        latitude = locationdata.coords.latitude
        // pass the longitude and latitude to the open weather map api
        var weatherMapURL = "http://api.openweathermap.org/data/2.5/forecast?lat=" + latitude + "&lon=" + longitude + "&appid=" + apiKey + "&units=metric"
        $.get(weatherMapURL).then(function (data) {
            console.log(data)
            //empty the forecast div
            $('.forecast').empty()

            //loop through the data and get the data for the 5 day forecast
            for (var i = 0; i < data.list.length; i++) {

                // check if the data for the time and if it is 3pm then get the data and set the text of the html elements then append them to the page
                if (data.list[i].dt_txt.indexOf("15:00:00") !== -1) {
                    var forecastCard = $('<div>')
                    forecastCard.addClass('card bg-primary text-white m-1')
                    var forecastCardBody = $('<div>')
                    forecastCardBody.addClass('card-body p-2')
                    var forecastDate = $('<h5>')
                    forecastDate.addClass('card-title')
                    var forecastDateText = data.list[i].dt_txt
                    var dateString = forecastDateText.substring(0, forecastDateText.indexOf('15:00:00'))
                    forecastDate.text(dateString)
                    var forecastTemp = $('<p>')
                    forecastTemp.addClass('card-text')
                    var temp = data.list[i].main.temp
                    var tempF = celsiusToFahrenheit(temp)
                    var forecastTempText = tempF
                    forecastTemp.text('Temp: ' + forecastTempText + '°F')
                    var windSpeed = data.list[i].wind.speed
                    var windSpeedMph = kphToMph(windSpeed)
                    var forecastWindSpeed = $('<p>')
                    forecastWindSpeed.addClass('card-text')
                    var forecastWindSpeedText = windSpeedMph
                    forecastWindSpeed.text('Wind: ' + forecastWindSpeedText + ' MPH')
                    var forecastHumidity = $('<p>')
                    forecastHumidity.addClass('card-text')
                    var forecastHumidityText = data.list[i].main.humidity
                    forecastHumidity.text('Humidity: ' + forecastHumidityText + '%')
                    var forecastIcon = $('<img>')
                    forecastIcon.attr('src', weatherIconURL + data.list[i].weather[0].icon + '@2x.png')
                    forecastCardBody.append(forecastDate, forecastIcon, forecastTemp, forecastWindSpeed, forecastHumidity)
                    forecastCard.append(forecastCardBody)
                    $('.forecast').append(forecastCard)
                }
            }

        })
    })
}

//function that gets the weather based on the city name
function getWeatherByCitySearch(cityName) {
    var weatherMapURL = "http://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + apiKey + "&units=metric"
    // get the data from the api and set the text of the html elements then append them to the page
    $.get(weatherMapURL).then(function (data) {
        $('#city-name').text(data.name)
        var temp = data.main.temp
        var tempF = celsiusToFahrenheit(temp)
        $('#current-temp').text(tempF + '°F')
        $('#current-humidity').text('Humidity: ' + data.main.humidity + '%')
        $('#current-wind-speed').text('Wind: ' + kphToMph(data.wind.speed) + ' MPH')
        var date = new Date();
        $('#current-date').text(date.toLocaleDateString())
        $('#current-weather-description').text(data.weather[0].description)
        $('#current-weather-icon').attr('src', weatherIconURL + data.weather[0].icon + '@2x.png')

    })
}
//function that gets the weather forecast based on the city name
function getWeatherForecastByCitySearch(cityName) {
    var weatherMapURL = "http://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&appid=" + apiKey + "&units=metric"
    // get the data from the api and set the text of the html elements then append them to the page
    $.get(weatherMapURL).then(function (data) {
        $('.forecast').empty()
        for (var i = 0; i < data.list.length; i++) {
            if (data.list[i].dt_txt.indexOf("15:00:00") !== -1) {
                var forecastCard = $('<div>')
                forecastCard.addClass('card bg-primary text-white m-1')
                var forecastCardBody = $('<div>')
                forecastCardBody.addClass('card-body p-2')
                var forecastDate = $('<h5>')
                forecastDate.addClass('card-title')
                var forecastDate = $('<h5>')
                forecastDate.addClass('card-title')
                var forecastDateText = data.list[i].dt_txt
                var dateString = forecastDateText.substring(0, forecastDateText.indexOf('15:00:00'))
                forecastDate.text(dateString)


                var forecastTemp = $('<p>')
                forecastTemp.addClass('card-text')
                var temp = data.list[i].main.temp
                var tempF = celsiusToFahrenheit(temp)
                var forecastTempText = tempF
                forecastTemp.text('Temp: ' + forecastTempText + '°F')
                var windSpeed = data.list[i].wind.speed
                var windSpeedMph = kphToMph(windSpeed)
                var forecastWindSpeed = $('<p>')
                forecastWindSpeed.addClass('card-text')
                var forecastWindSpeedText = windSpeedMph
                forecastWindSpeed.text('Wind: ' + forecastWindSpeedText + ' MPH')
                var forecastHumidity = $('<p>')
                forecastHumidity.addClass('card-text')
                var forecastHumidityText = data.list[i].main.humidity
                forecastHumidity.text('Humidity: ' + forecastHumidityText + '%')
                var forecastIcon = $('<img>')
                forecastIcon.attr('src', weatherIconURL + data.list[i].weather[0].icon + '@2x.png')
                forecastCardBody.append(forecastDate, forecastIcon, forecastWindSpeed, forecastTemp, forecastHumidity)
                forecastCard.append(forecastCardBody)
                $('.forecast').append(forecastCard)
            }
        }

    })
}


// use the search button to get the value of the input then store that value to local storage and call the getWeatherByCitySearch function
searchButton.click(function () {
    // get input from search box
    var searchedCity = searchInput.val()
    // if there is no data in local storage, create an empty array in local storage
    if (localStorage.getItem('searchedCity') === null) {
        localStorage.setItem('searchedCity', JSON.stringify([]))
    }
    // get the data from local storage and push the new city to the array
    var storedData = JSON.parse(localStorage.getItem('searchedCity'))
    if (storedData.length < 10) {
        storedData.push(searchedCity)
    } else {
        storedData.shift()

    }
    if (searchedCity === '') {
        return false
    }
    var button = $('<button>')
    button.addClass('btn btn-dark opacity-75 recent-search-button   mb-1 text-center')
    button.attr('type', 'button')
    button.text(searchedCity.toUpperCase())
    $('.search-history').append(button)

    // set the new array to local storage
    localStorage.setItem('searchedCity', JSON.stringify(storedData))


    getWeatherByCitySearch(searchedCity)
    getWeatherForecastByCitySearch(searchedCity)
    $('#search-input').val('')



})

//function that sets a button (up to 10) for each city that has been searched
function setRecentSearchButtons() {
    if (localStorage.getItem('searchedCity') !== null) {
        var storedData = JSON.parse(localStorage.getItem('searchedCity'))
        for (var i = 0; i < storedData.length; i++) {
            var button = $('<button>')
            button.addClass('btn btn-dark opacity-75 recent-search-button   mb-1 text-center')
            button.attr('type', 'button')
            button.text(storedData[i].toUpperCase())
            $('.search-history').append(button)
        }
    }
}

//function that gets the weather based on the user selecting a recent search button
$(document).on('click', '.recent-search-button', function () {
    var searchedCity = $(this).text()
    getWeatherByCitySearch(searchedCity)
    getWeatherForecastByCitySearch(searchedCity)
    $('#search-input').val('')
})

setRecentSearchButtons()
getLocalWeatherWithLongLat()
getLocalWeatherForecastWithLongLat()




