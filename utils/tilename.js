function long2tile(lon,zoom) {return (Math.floor((lon+180)/360*Math.pow(2,zoom)));}
function lat2tile(lat,zoom)  {return (Math.floor((1-Math.log(Math.tan(lat*Math.PI/180) + 1/Math.cos(lat*Math.PI/180))/Math.PI)/2 *Math.pow(2,zoom)));}

function tile2long(x,z) {
    return (x/Math.pow(2,z)*360-180);
}
function tile2lat(y,z) {
    var n=Math.PI-2*Math.PI*y/Math.pow(2,z);
    return (180/Math.PI*Math.atan(0.5*(Math.exp(n)-Math.exp(-n))));
}

/*
var zoom        = 9;
var top_tile    = lat2tile(north_edge, zoom);
var left_tile   = lon2tile(west_edge, zoom);
var bottom_tile = lat2tile(south_edge, zoom);
var right_tile  = lon2tile(east_edge, zoom);
var width       = Math.abs(left_tile - right_tile) + 1;
var height      = Math.abs(top_tile - bottom_tile) + 1;
var total_tiles = width * height;
*/