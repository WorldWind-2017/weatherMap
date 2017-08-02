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
    function (ww, LayerManager)
    {
        "use strict";

        var wwd = new WorldWind.WorldWindow("canvasOne");
        var layers = [
            {layer: new WorldWind.BMNGLayer(), enabled: false},
            {layer: new WorldWind.BMNGLandsatLayer(), enabled: false},
            {layer: new WorldWind.BingAerialLayer(null), enabled: false},
            {layer: new WorldWind.BingAerialWithLabelsLayer(null), enabled: true},
            {layer: new WorldWind.BingRoadsLayer(null), enabled: false},
            {layer: new WorldWind.CompassLayer(), enabled: false},
            {layer: new WorldWind.CoordinatesDisplayLayer(wwd), enabled: true},
            {layer: new WorldWind.ViewControlsLayer(wwd), enabled: true}
        ];

        for (var l = 0; l < layers.length; l++) {
            layers[l].layer.enabled = layers[l].enabled;
            wwd.addLayer(layers[l].layer);
        }

        //returns API URL as a string
        function createAPIURL(lat, long) {
            return 'http://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + long + '&appid=' + APIKey;
        }

        //returns weather formatted as an HTML String
        function formatWeather(APIURL) {
            $.ajax({
                url: encodeURI(APIURL),
                method: 'get',
                dataType: 'json',
                success: function (data) {
                    //Create some html
                    var tempHTML = '<h5 class="fontsize"><b>Weather Details for ' + data.name + '</b></h5>';
                    tempHTML += '<p><b>Country:</b> ' + data.sys.country + '</p><br>';
                    tempHTML += '<p><b>Current Outlook:</b> ' + data.weather[0].main + '</p><br>';
                    tempHTML += '<p><b>Current Outlook Description:</b> ' + data.weather[0].description + '</p><br>';
                    tempHTML += '<p><b>Current Temperature (Celsius):</b> ' + Math.round((data.main.temp - 272), 2) + '</p><br>';
                    tempHTML += '<p><b>Sunrise:</b> ' + timeConverter(data.sys.sunrise) + '</p><br>';
                    tempHTML += '<p><b>Sunset:</b> ' + timeConverter(data.sys.sunset) + '</p><br>';
                    tempHTML += '<p><b>Max Temperature Today (Celsius):</b> ' + Math.round((data.main.temp_max - 272), 2) + '</p><br>';
                    tempHTML += '<p><b>Min Temperature Today (Celsius):</b> ' + Math.round(data.main.temp_min - 272, 2) + '</p><br>';
                    tempHTML += '<p><b>Pressure (HPa):</b> ' + data.main.pressure + '</p><br>';
                    tempHTML += '<p><b>Humidity (%):</b> ' + data.main.humidity + '</p><br>';
                    tempHTML += '<p><b>Wind speed (m/s):</b>' + data.wind.speed + '</p><br><br>';
                },
                fail: function () {

                }
            })
        }

        var handleClick = function (recognizer)
        {
            // Obtain the event location.
            var x = recognizer.clientX,
                y = recognizer.clientY;

            // Perform the pick. Must first convert from window coordinates to canvas coordinates, which are
            // relative to the upper left corner of the canvas rather than the upper left corner of the page.
            var pickList = wwd.pick(wwd.canvasCoordinates(x, y));

            // If only one thing is picked and it is the terrain, tell the world window to go to the picked location.
            if (pickList.objects.length == 1 && pickList.objects[0].isTerrain) {
                var position = pickList.objects[0].position;
                wwd.goTo(new WorldWind.Location(position.latitude, position.longitude));
            } else {
                handlePick(x,y);
            }
        };
    });