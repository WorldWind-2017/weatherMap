/**
 * Created by atreyaiyer on 8/2/17.
 */

/*
 * Copyright (C) 2014 United States Government as represented by the Administrator of the
 * National Aeronautics and Space Administration. All Rights Reserved.
 */

var APIKey = 'babeba397663d3ffbdb30c76c2a41181';

requirejs({paths:{
    "jquery":"https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min",
}
},['src/WorldWind',
        './LayerManager', 'src/formats/kml/KmlFile',
        'src/formats/kml/controls/KmlTreeVisibility', './Pin', 'jquery'],
    function (ww,
              LayerManager, KmlFile, KmlTreeVisibility)
    {
        "use strict";
    }

    //returns API URL as a string
    function createAPIURL(lat, long)
    {
        return 'http://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + long + '&appid=' + APIKey;
    }

    //returns weather formatted as an HTML String
    function formatWeather(APIURL)
    {
        $.ajax({
            url: encodeURI(APIURL),
            method: 'get',
            dataType: 'json',
            success: function(data) {
                //Create some html
                var tempHTML = '<h5 class="fontsize"><b>Weather Details for ' + data.name + '</b></h5>';
                tempHTML += '<p><b>Country:</b> ' + data.sys.country + '</p><br>';
                tempHTML += '<p><b>Current Outlook:</b> ' + data.weather[0].main + '</p><br>';
                tempHTML += '<p><b>Current Outlook Description:</b> ' + data.weather[0].description + '</p><br>';
                tempHTML += '<p><b>Current Temperature (Celsius):</b> ' + Math.round((data.main.temp - 272),2) + '</p><br>';
                tempHTML += '<p><b>Sunrise:</b> ' + timeConverter(data.sys.sunrise) + '</p><br>';
                tempHTML += '<p><b>Sunset:</b> ' + timeConverter(data.sys.sunset) + '</p><br>';
                tempHTML += '<p><b>Max Temperature Today (Celsius):</b> ' + Math.round((data.main.temp_max - 272),2) + '</p><br>';
                tempHTML += '<p><b>Min Temperature Today (Celsius):</b> ' + Math.round(data.main.temp_min  - 272, 2) + '</p><br>';
                tempHTML += '<p><b>Pressure (HPa):</b> ' + data.main.pressure + '</p><br>';
                tempHTML += '<p><b>Humidity (%):</b> ' + data.main.humidity + '</p><br>';
                tempHTML += '<p><b>Wind speed (m/s):</b>' + data.wind.speed + '</p><br><br>';
            },
            fail: function() {

            }
        })
    }
