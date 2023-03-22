
var currentCity = $('#city-name')
var apiKey = "fba023ca6e5dbd4a7e2aa022e0fb15e6"
var searchInput = $('#search-input')
var currrentTemp = $('#current-temp')
var weatherIconURL = 'https://openweathermap.org/img/wn/'

var longitude = 0
var latitude = 0


var date = new Date();
var daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const dayName = daysOfWeek[date.getDay()] + '(' + date.toLocaleDateString() + ')';

var _5DaysForecast = $('._5-days-forecast')
function celsiusToFahrenheit(celsius) {
    var fahrenheit = Math.round((celsius * 9 / 5) + 32);
    return fahrenheit;
}
function kphToMph(kph) {
    var mph = Math.round(kph / 1.60934);
    return mph;
}

function getLocalWeatherWithLongLat() {
    navigator.geolocation.getCurrentPosition(function (locationdata) {
        longitude = locationdata.coords.longitude
        latitude = locationdata.coords.latitude
        var weatherMapURL = "http://api.openweathermap.org/data/2.5/weather?lat=" + latitude + "&lon=" + longitude + "&appid=" + apiKey + "&units=metric"
        $.get(weatherMapURL).then(function (data) {
            console.log('...........LOCAL weather with longitude and latidude...........')
            console.log(data)
            console.log('.........................................')
            return data
        })
    })
}
function getLocalWeatherForecastWithLongLat() {
    navigator.geolocation.getCurrentPosition(function (locationdata) {
        longitude = locationdata.coords.longitude
        latitude = locationdata.coords.latitude
        // console.log(longitude, latitude)
        var weatherMapURL = "http://api.openweathermap.org/data/2.5/forecast?lat=" + latitude + "&lon=" + longitude + "&appid=" + apiKey + "&units=metric"
        $.get(weatherMapURL).then(function (data) {
            console.log('...........FORECAST with longitude and latidude...........')
            console.log(data)
            console.log('.........................................')
            return data
        })
    })
}


function getWeatherByCitySearch(cityName) {
    var weatherMapURL = "http://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + apiKey + "&units=metric"
    $.get(weatherMapURL).then(function (data) {
        console.log('...........CITY weather by city name...........')
        console.log(data)
        console.log('............' + cityName + '.................')
        console.log('.........................................')
        return data
    })
}

function getWeatherForecastByCitySearch(cityName) {
    var weatherMapURL = "http://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&appid=" + apiKey + "&units=metric"
    $.get(weatherMapURL).then(function (data) {
        console.log('...........CITY weather FORECAST by city name  ...........')
        console.log(data)
        console.log('.........................................')
        return data
    })
}

var searchButton = $('#search-button')


searchButton.click(function () {
    // get input from search box
    var searchedCity = searchInput.val()
    // if there is no data in local storage, create an empty array in local storage
    if (localStorage.getItem('searchedCity') === null) {
        localStorage.setItem('searchedCity', JSON.stringify([]))
    }
    // get the data from local storage and push the new city to the array
    var storedData = JSON.parse(localStorage.getItem('searchedCity'))
    storedData.push(searchedCity)
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

$(document).on('click', '.recent-search-button', function () {
    var searchedCity = $(this).text()
    getWeatherByCitySearch(searchedCity)
    $('#search-input').val('')
})

getLocalWeatherForecastWithLongLat()
setRecentSearchButtons()
getLocalWeatherWithLongLat()




