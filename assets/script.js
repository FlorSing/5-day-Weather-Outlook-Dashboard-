function renderButtons() {
   var a = $("<button>").addClass("cities").text(readText);
   citiesDiv = $("<div class='citiesList'>");
   citiesDiv.append(a);
    $("#history").prepend(citiesDiv);};

var APIKey = "72380dfb30d88ca9844eebc1d2827077";

//determine what city is being searched
function getSearchTextValue(){
  var searchInput = $("#search-input").val();
  localStorage.setItem('searchText', searchInput);}

$("#search-button").on('click', function(){getSearchTextValue()});
readText = localStorage.getItem('searchText');
console.log(readText);
$("#search-input").val(readText);

renderButtons();

//use the searched item in api url query
var cityName = readText;

var countryCode;
var getGeoLocURL = "http://api.openweathermap.org/geo/1.0/direct?q="+cityName+"&limit=5&appid="+APIKey;
$.ajax({
  url: getGeoLocURL,
  method: "GET"
}).then(function(geoLoc) {
  var geoLocArray = geoLoc
  localStorage.setItem('lat',geoLocArray[0].lat);
  localStorage.setItem('lon',geoLocArray[0].lon);
  localStorage.setItem('city',geoLocArray[0].name);
  localStorage.setItem('country',geoLocArray[0].country);
});
var city = localStorage.getItem('city');
var country = localStorage.getItem('country');
var lat = localStorage.getItem('lat');
var lon = localStorage.getItem('lon');

//url query output for use on dashboard = city, temp, wind, humidity
var forecastQueryURL = "http://api.openweathermap.org/data/2.5/forecast?lat="+lat+"&lon="+lon+"&appid="+APIKey;
$.ajax({
  url:forecastQueryURL,
  method: "GET"
}).then(function(weather) {
  console.log(weather);
  var currWeather = weather.list[0];
  var fore1Weather = weather.list[7];
  var fore2Weather = weather.list[15];
  var fore3Weather = weather.list[23];
  var fore4Weather = weather.list[31];
  var fore5Weather = weather.list[39];
  
  localStorage.setItem('dateCurrW',currWeather.dt);
  localStorage.setItem('tempCurrW',currWeather.main.temp);
  localStorage.setItem('windCurrW',currWeather.wind.speed);
  localStorage.setItem('humidityCurrW',currWeather.main.humidity);

  localStorage.setItem('dateFore1W',fore1Weather.dt);
  localStorage.setItem('tempFore1W',fore1Weather.main.temp);
  localStorage.setItem('windFore1W',fore1Weather.wind.speed);
  localStorage.setItem('humidityFore1W',fore1Weather.main.humidity);
  
  localStorage.setItem('dateFore2W',fore2Weather.dt);
  localStorage.setItem('tempFore2W',fore2Weather.main.temp);
  localStorage.setItem('windFore2W',fore2Weather.wind.speed);
  localStorage.setItem('humidityFore2W',fore2Weather.main.humidity);
  
  localStorage.setItem('dateFore3W',fore3Weather.dt);
  localStorage.setItem('tempFore3W',fore3Weather.main.temp);
  localStorage.setItem('windFore3W',fore3Weather.wind.speed);
  localStorage.setItem('humidityFore3W',fore3Weather.main.humidity);
  
  localStorage.setItem('dateFore4W',fore4Weather.dt);
  localStorage.setItem('tempFore4W',fore4Weather.main.temp);
  localStorage.setItem('windFore4W',fore4Weather.wind.speed);
  localStorage.setItem('humidityFore4W',fore4Weather.main.humidity);
  
  localStorage.setItem('dateFore5W',fore5Weather.dt);
  localStorage.setItem('tempFore5W',fore5Weather.main.temp);
  localStorage.setItem('windFore5W',fore5Weather.wind.speed);
  localStorage.setItem('humidityFore5W',fore5Weather.main.humidity);
  
});

var dateCurrW = moment.unix(localStorage.getItem('dateCurrW')).format('DD MMM YYYY');
var tempCurrW = ((localStorage.getItem('tempCurrW'))-273.15).toFixed(0);
var windCurrW = localStorage.getItem('windCurrW');
var humidityCurrW = localStorage.getItem('humidityCurrW');

var dateFore1W = moment.unix(localStorage.getItem('dateFore1W')).format('DD MMM YYYY');
var tempFore1W = ('Temp: '+((localStorage.getItem('tempFore1W'))-273.15).toFixed(0))+" °C";
var windFore1W = ('Wind: '+(localStorage.getItem('windFore1W'))+" kph");
var humidityFore1W = ('Humidity: '+(localStorage.getItem('humidityFore1W'))+"%");

var dateFore2W = moment.unix(localStorage.getItem('dateFore2W')).format('DD MMM YYYY');
var tempFore2W = ('Temp: '+((localStorage.getItem('tempFore2W'))-273.15).toFixed(0))+" °C";
var windFore2W = ('Wind: '+(localStorage.getItem('windFore2W'))+" kph");
var humidityFore2W = ('Humidity: '+(localStorage.getItem('humidityFore2W'))+"%");

var dateFore3W = moment.unix(localStorage.getItem('dateFore3W')).format('DD MMM YYYY');
var tempFore3W = ('Temp: '+((localStorage.getItem('tempFore3W'))-273.15).toFixed(0))+" °C";
var windFore3W = ('Wind: '+(localStorage.getItem('windFore3W'))+" kph");
var humidityFore3W = ('Humidity: '+(localStorage.getItem('humidityFore3W'))+"%");

var dateFore4W = moment.unix(localStorage.getItem('dateFore4W')).format('DD MMM YYYY');
var tempFore4W = ('Temp: '+((localStorage.getItem('tempFore4W'))-273.15).toFixed(0))+" °C";
var windFore4W = ('Wind: '+(localStorage.getItem('windFore4W'))+" kph");
var humidityFore4W = ('Humidity: '+(localStorage.getItem('humidityFore4W'))+"%");

var dateFore5W = moment.unix(localStorage.getItem('dateFore5W')).format('DD MMM YYYY');
var tempFore5W = ('Temp: '+((localStorage.getItem('tempFore5W'))-273.15).toFixed(0))+" °C";
var windFore5W = ('Wind: '+(localStorage.getItem('windFore5W'))+" kph");
var humidityFore5W = ('Humidity: '+(localStorage.getItem('humidityFore5W'))+"%");




$("<h1>").appendTo($('#today')).text(cityName + " ("+ dateCurrW+")");
$("<p>").appendTo($('#today')).text('Temp: '+tempCurrW+" °C");
$("<p>").appendTo($('#today')).text('Wind: '+windCurrW+" kph");
$("<p>").appendTo($('#today')).text('Humidity: '+humidityCurrW+"%");

foreTbl = $("<table>").appendTo($('#forecast'))

foreTblHead = $("<thead>").appendTo(foreTbl);
foreTblHeader = $("<tr>").appendTo(foreTblHead);
foreTblHeader.append($("<th>").text('5-Day Foreast:'));

foreTblData = $("<tbody>").appendTo(foreTbl);
foreTblDataRow1 = $("<tr>").appendTo(foreTblData);

date1Row = $("<th scope = 'col'>").text(dateFore1W).appendTo(foreTblDataRow1);
date2Row = $("<th scope = 'col'>").text(dateFore2W).appendTo(foreTblDataRow1);
date3Row = $("<th scope = 'col'>").text(dateFore3W).appendTo(foreTblDataRow1);
date4Row = $("<th scope = 'col'>").text(dateFore4W).appendTo(foreTblDataRow1);
date5Row = $("<th scope = 'col'>").text(dateFore5W).appendTo(foreTblDataRow1);

foreTblDataRow2 = $("<tr>").appendTo(foreTblData);
temp1Row2 = $("<td>").text(tempFore1W).appendTo(foreTblDataRow2);
temp2Row2 = $("<td>").text(tempFore2W).appendTo(foreTblDataRow2);
temp3Row2 = $("<td>").text(tempFore3W).appendTo(foreTblDataRow2);
temp4Row2 = $("<td>").text(tempFore4W).appendTo(foreTblDataRow2);
temp5Row2 = $("<td>").text(tempFore5W).appendTo(foreTblDataRow2);

foreTblDataRow3 = $("<tr>").appendTo(foreTblData);
wind1Row3 = $("<td>").text(windFore1W).appendTo(foreTblDataRow3);
wind2Row3 = $("<td>").text(windFore2W).appendTo(foreTblDataRow3);
wind3Row3 = $("<td>").text(windFore3W).appendTo(foreTblDataRow3);
wind4Row3 = $("<td>").text(windFore4W).appendTo(foreTblDataRow3);
wind5Row3 = $("<td>").text(windFore5W).appendTo(foreTblDataRow3);

foreTblDataRow4 = $("<tr>").appendTo(foreTblData);
humidity1Row4 = $("<td>").text(humidityFore1W).appendTo(foreTblDataRow4);
humidity2Row4 = $("<td>").text(humidityFore2W).appendTo(foreTblDataRow4);
humidity3Row4 = $("<td>").text(humidityFore3W).appendTo(foreTblDataRow4);
humidity4Row4 = $("<td>").text(humidityFore4W).appendTo(foreTblDataRow4);
humidity5Row4 = $("<td>").text(humidityFore5W).appendTo(foreTblDataRow4);


