var citiesArr = [];
init()

function storeCities(){
    // Stringify and set "cities" key in localStorage to citiesArr array
    localStorage.setItem("cities", JSON.stringify(citiesArr));
}

function renderCities(){
    //Clear the Existing Buttons
    $("#city-history").empty();

    // Render a new button for each city
    for (var i = 0; i < citiesArr.length; i++) {
        var city = citiesArr[i];
        var cityButton = $("<button>");
        cityButton.addClass("list-group-item");
        cityButton.html(city);
        $("#city-history").append(cityButton);
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

function buildQueryURL(){
    
}

$("#run-search").on("click",function(event){
    event.preventDefault()
    var city = $("#search-query").val().trim();
    console.log(city)
  
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

    // Build the query URL for the ajax request to the NYT API
    var queryURL = buildQueryURL();

})