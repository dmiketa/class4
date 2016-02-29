  

var map = L.map('map').setView([40.730982,-73.997340], 10);

L.tileLayer('http://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png',{
     attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="http://cartodb.com/attributions">CartoDB</a>'
    }).addTo(map);


  //color for educational attainment
  function getColor(b) {
      return b> 0.50 ? '#7a0177' :
            b> 0.40  ? '#dd3497' :
            b> 0.30  ? '#f768a1' :
            b> 0.20  ? '#fa9fb5' :
            b> 0.10  ? '#fcc5c0' :
                        '#feebe2';
  }

 
  function style(feature) {
    return {
        fillColor: getColor(feature.properties.Sheet1_PCT_Bach_Higher),
        weight: 2,
        opacity: 1,
        color: 'white',
        fillOpacity: 0.5
    };
  }

  function mouseoverFunction(e) {
    var layer = e.target;

    layer.setStyle({
        weight: 5,
        color: '#666',
        fillOpacity: 0.5
    });

    if (!L.Browser.ie && !L.Browser.opera) {
        layer.bringToFront();
    }

    $('#infoWindow').text(layer.feature.properties.Sheet1_PCT_Bach_Higher);
  }


  function resetHighlight(e) {
    geojson.resetStyle(e.target);
  }

 
  function onEachFeature(feature, layer) {
    layer.on({
        mouseover: mouseoverFunction,
        mouseout: resetHighlight
    });
  }

  var legend = L.control({position: 'bottomright'});

legend.onAdd = function (map) {

    var div = L.DomUtil.create('div', 'info legend'),
        grades = [0.10, 0.20, 0.30, 0.4, 0.5,],
        labels = [];

    for (var i = 0; i < grades.length; i++) {
        div.innerHTML +=
            '<i style="background:' + getColor(grades[i] + 0.1) + '"></i> ' +
            grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
    }

    return div;
};

legend.addTo(map);

  $.getJSON('data/boros.geojson', function(boro_data) {
    geojson = L.geoJson(boro_data,{
      style: style,
      onEachFeature: onEachFeature
    }).addTo(map);
  });

 
  
