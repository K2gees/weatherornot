$(document).ready(function () {
    function weatherForecast(e) {
        var searchCity = $("#searchArea").val()
        console.log(searchCity)
        var now = new Date();
        var today = `${now.getMonth()}/${now.getDate()}/${now.getFullYear()}`
        console.log(today)

        $("#pastCities").append(`
        <button class="${searchCity}" value="">${searchCity}</button>
        <br>
        `
        )
        //AJAX call
        var queryUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + searchCity + "&units=imperial" + "&appid=b9deded43e3ef3bd5f1500cfbe3984bc"
        console.log(queryUrl)
        $.ajax({
            method: "GET",
            url: queryUrl
        }).then(function (response) {
            var queryOneCall = `https://api.openweathermap.org/data/2.5/onecall?lat=${response.coord.lat}&lon=${response.coord.lon}&exclude=minutely,hourly&appid=b9deded43e3ef3bd5f1500cfbe3984bc&units=imperial`
            $.ajax({
                method: "GET",
                url: queryOneCall
            }).then(function(res){
                console.log(res)
                function uvIndex(uvi){
                    if(uvi < 3){
                        return "low"
                    } else if(uvi >= 3 && uvi < 6){
                        return "moderate"
                    } else if (uvi >= 6 && uvi < 8){
                    return "high"
                    } else if (uvi >= 8){
                        return "veryHigh"
                    }
                }
                $(".display").empty()
                $(".display").append(`
            <h3 class="current-city">${searchCity} ${today}</h3>
            <img src="http://openweathermap.org/img/wn/${response.weather[0].icon}@2x.png" alt="weather icon" width="100" height="100"/>   
            <p class="temperature">Temperature: ${response.main.temp}</p>
            <p class="humidity">Humidity ${response.main.humidity}</p>
            <p class="wind-speed">Wind Speed ${response.wind.speed}</p>
            <p class="index ${uvIndex(res.current.uvi)}">UV index ${res.current.uvi}</p>`)
            res.daily.map((forecast, index) =>{
                if (index > 0 && index < 6){
                    console.log(forecast)
                    $(`.day${index}`).empty()
                    $(`.day${index}`).append(`
                    <h3>${forecast.dt.getMonth()}/${forecast.dt.getDate()}/${forecast.dt.getFullYear()}</h3>
                    <img src="http://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png" alt="weather icon" width="100" height="100"/>   
                    <p class="temperature">Minimum Temperature: ${forecast.temp.min}</p>
                    <p class="temperature">Maximum Temperature: ${forecast.temp.max}</p>
                    <p class="humidity">Humidity ${forecast.humidity}</p>
                    <p class="wind-speed">Wind Speed ${forecast.wind_speed}</p>
                    <p class="index ${uvIndex(forecast.uvi)}">UV index ${forecast.uvi}</p>`)
                }
            })

            })
    
        })
    }

    function fiveDay() {
        //ajax call 5 day forecast
    }

    //this
//$(this).attr("value") will return the  value to you
    $("#searchBtn").on("click", weatherForecast)

})