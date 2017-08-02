/**
 * Created by atreyaiyer on 8/2/17.
 */
var APIKey = 'babeba397663d3ffbdb30c76c2a41181';
function createAPIURL(lat, long)
{
    return 'http://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + long + '&appid=' + APIKey;
}

