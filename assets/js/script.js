$(document).ready(function () {
    function weatherForecast(e) {
        e.preventDefault()
        var searchCity = $("#searchArea").val()
        console.log(searchCity)

        $("#pastCities").append(`
        <button class="${searchCity}" value="">${searchCity}</button>
        <br>
        `
        )
        //AJAX call
        var queryUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + searchCity + "&appid=b9deded43e3ef3bd5f1500cfbe3984bc"
        console.log(queryUrl)
        $.ajax({
            method: "GET",
            url: queryUrl
        }).then(function (response) {
            console.log(response)
            $(".display").append(`
            <h3 class="current-city">Current City with date</h3>
            <p class="temperature">Temperature: ${response.main.temp}</p>
            <p class="humidity">Humidity ${response.main.humidity}</p>
            <p class="wind-speed">Wind Speed ${response.wind.speed}</p>
            <p class="index">UV index</p>`)
        })
    }

    function fiveDay() {
        //ajax call 5 day forecast
    }

    //this
//$(this).attr("value") will return the  value to you
    $("#searchBtn").on("click", weatherForecast)

})