$(document).ready(function(){
    var citiesArr = [];
    var apiKey = "aae16a9b531aff6c4a2ca4aa15a3bed3";
    init()
    function storeCities(){
        // Stringify and set "cities" key in localStorage to citiesArr array
        localStorage.setItem("cities", JSON.stringify(citiesArr));
    }
    dailyAJAXCall(citiesArr[citiesArr.length-1]);
    forecastAJAXCall(citiesArr[citiesArr.length-1]);    
    
    function renderCities(){
        //Clear the Existing Buttons
        $("#city-history").empty();
    
        // Render a new button for each city
        for (var i = 0; i < citiesArr.length; i++) {
            var city = citiesArr[i];
            var cityButton = $("<input>");
            cityButton.addClass("list-group-item");
            cityButton.html(city);
            cityButton.attr("id","city-button");
            cityButton.attr("value",city);
            cityButton.attr("type","submit");
            $("#city-history").prepend(cityButton);
    }}
    
    
    function init() {
        // Get stored cities from localStorage parsing the JSON string to an object
        var storedCities = JSON.parse(localStorage.getItem("cities"));
      
        // If cities were retrieved from localStorage, update the cities array to it
        if (storedCities !== null) {
          citiesArr = storedCities;
        }
      
        // Render cities to the DOM
        renderCities();
      }
   
      function buildQueryURLDay(city){
        //Create a function to build the Query URL to request the current weather        
        var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=";
        queryURL =  queryURL+city+"&APPID="+apiKey;
        return queryURL;
    }

    function buildQueryURLForecast(city){    
        //Create a function to build the Query URL to request the current forecast    
        var queryURL = "http://api.openweathermap.org/data/2.5/forecast?q=";
        queryURL =  queryURL+city+"&APPID="+apiKey;
        return queryURL;
    }
    
    function buildQueryURLUV(lat,lon){
        //Create a function to build the Query URL to request the current weather
        //http://api.openweathermap.org/data/2.5/uvi?appid={appid}&lat={lat}&lon={lon}     
        var queryURL = "http://api.openweathermap.org/data/2.5/uvi?appid=";
        queryURL =  queryURL+apiKey+"&"+"lat="+lat+"&lon="+lon;
        return queryURL;
    }


    function toF(kelvin){
        var f = Math.round(((kelvin-273.15)*1.8)+32)
        return f
    }
    function updateHero(dailyData){
        //console.log(dailyData);
        var heroTemp = toF(dailyData.main.temp);
        var heroHumidity = dailyData.main.humidity;
        var heroWindSpeed = dailyData.wind.speed;
        var heroCityName = dailyData.name;
        var heroIcon = dailyData.weather[0].icon;
        var heroIconURl = "https://openweathermap.org/img/w/" + heroIcon + ".png";

        $("#hero-city-name").html(heroCityName + " - " + moment().format("dddd, MMMM Do YYYY"));
        $("#hero-city-icon").html("<img src='" + heroIconURl  + "'>");
        $("#hero-temperature").html("Temperature: " +heroTemp + " °F");
        $("#hero-humidity").html("Humidity: " +heroHumidity + "%");
        $("#hero-wind-speed").html("Wind Speed: " +heroWindSpeed + " MPH");

        var lat = dailyData.coord.lat;
        var lon = dailyData.coord.lon;
        var queryURL = buildQueryURLUV(lat,lon);
        //Ajax call to open weather API
        $.ajax({
            url: queryURL,
            method: "GET"
          }).then(function(response){
              var heroUVIndex = response.value;
              $("#hero-uv-index").html("UV Index " + heroUVIndex)
          })
    }

    function updateForecast(forecastData){
        //console.log(forecastData);
        day0 ={
            temperature: toF(forecastData.list[0].main.temp),
            humidity: forecastData.list[0].main.humidity,
            icon: forecastData.list[0].weather[0].icon
        }
        var iconUrl0 = "https://openweathermap.org/img/w/" + day0.icon + ".png";

        $("#day-0-date").html(moment().format("MM/ DD/ YY"));
        $("#day-0-temperature").html("Temp: " +day0.temperature + " °F");
        $("#day-0-humidity").html("Humidity: " +day0.humidity + "%");
        $("#day-0-icon").html("<img src='" + iconUrl0  + "'>");

        day1 ={
            temperature: toF(forecastData.list[1].main.temp),
            humidity: forecastData.list[1].main.humidity,
            icon: forecastData.list[1].weather[0].icon
        }
        var iconUrl1 = "https://openweathermap.org/img/w/" + day1.icon + ".png";

        $("#day-1-date").html(moment().add(1, 'days').format("MM/ DD/ YY"));
        $("#day-1-temperature").html("Temp: " +day1.temperature + " °F");
        $("#day-1-humidity").html("Humidity: " +day1.humidity + "%");
        $("#day-1-icon").html("<img src='" + iconUrl1  + "'>");

        day2 ={
            temperature: toF(forecastData.list[2].main.temp),
            humidity: forecastData.list[2].main.humidity,
            icon: forecastData.list[2].weather[0].icon
        }

        var iconUrl2 = "https://openweathermap.org/img/w/" + day2.icon + ".png";


        $("#day-2-date").html(moment().add(2, 'days').format("MM/ DD/ YY"));
        $("#day-2-temperature").html("Temp: " +day2.temperature + " °F");
        $("#day-2-humidity").html("Humidity: " +day2.humidity + "%");
        $("#day-2-icon").html("<img src='" + iconUrl2  + "'>");

        day3 ={
            temperature: toF(forecastData.list[3].main.temp),
            humidity: forecastData.list[3].main.humidity,
            icon: forecastData.list[3].weather[0].icon
        }
        var iconUrl3 = "https://openweathermap.org/img/w/" + day3.icon + ".png";

        $("#day-3-date").html(moment().add(3, 'days').format("MM/ DD/ YY"));
        $("#day-3-temperature").html("Temp: " +day3.temperature + " °F");
        $("#day-3-humidity").html("Humidity: " +day3.humidity + "%");
        $("#day-3-icon").html("<img src='" + iconUrl3  + "'>");

        day4 ={
            temperature: toF(forecastData.list[4].main.temp),
            humidity: forecastData.list[4].main.humidity,
            icon: forecastData.list[4].weather[0].icon
        }
        var iconUrl4 = "https://openweathermap.org/img/w/" + day4.icon + ".png";

        $("#day-4-date").html(moment().add(4, 'days').format("MM/ DD/ YY"));
        $("#day-4-temperature").html("Temp: " +day4.temperature + " °F");
        $("#day-4-humidity").html("Humidity: " +day4.humidity + "%");
        $("#day-4-icon").html("<img src='" + iconUrl4  + "'>");
        


/*         for (i=0; i<4; i++){
            day[i] ={
                temperature: toF(forecastData.list[i].main.temp),
                humidity: forecastData.list[i].main.humidity,
                icon: forecastData.list[i].weather.icon
            }
            $("#day"+[i]+"date").html(moment().format("MM/ DD/ YY"));
            $("#day"+[i]+"temperature").html("Temp: " +day[i].temperature + " °F");
            $("#day-zero-humidity").html("Humidity: " +dayZero.humidity + "%");
            $("#day-zero-icon").html(dayZero.icon);
    
        } */
    }
    
    $("#run-search").on("click",function(event){
        event.preventDefault();
        var city = $("#search-query").val().trim();
      
        // Return from function early if submitted City is blank
      if (city === "") {
        return;
      }
    
      // Add new City to cities array
      citiesArr.push(city);
    
      //Clear input
      $("#search-query").val("")
      storeCities();
      renderCities();
      
      //Call a function to run the AJAX GET
      dailyAJAXCall(city);

      //Call a function to run the AJAX Get
      forecastAJAXCall(city);
    })
    
    $("#city-history").on("click","#city-button",function(event){
        event.preventDefault()
        var cityCall = $(this).val();
        
        //Call a function to run the AJAX GET
        dailyAJAXCall(cityCall);
        
        //Call a function to run the AJAX GET
        forecastAJAXCall(cityCall);
    })

    function dailyAJAXCall (city){
        var queryURL = buildQueryURLDay(city);
    
        //Ajax call to open weather API
        $.ajax({
            url: queryURL,
            method: "GET"
          }).then(function(dailyData){
            updateHero(dailyData);
        })

    }

    function forecastAJAXCall (city){
        var queryURL = buildQueryURLForecast(city)

        //Ajax call to open weather API
        $.ajax({
            url: queryURL,
            method: "GET"
          }).then(function(forecastData){
              updateForecast(forecastData);
          })        
    }

    
})