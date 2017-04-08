//I understand that in good practice, jQuery does NOT belong in back end logic. I am out of practice however, and wanted to make this work however I could. If for some reason you are reading this and have suggestion for cleaning up my code, email me at rav.ryanvinyard@gmail.com

var prevInfoWindow = false;


function resetFields() {
  $("input#activity").val("");
  $("input#address").val("");
  $("input#time").val("");
  $("input#description").val("");
}

function clearInfoWindows() {
  if (infowindow) {
    infowindow.close();
  }
};

function initMap() {
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 14,
    center: {lat: 44.049301, lng: -123.095047}
  });


  var geocoder = new google.maps.Geocoder();
  document.getElementById('submit').addEventListener('click', function() {
    geocodeAddress(geocoder, map);
  });
}

function geocodeAddress(geocoder, resultsMap) {
  var address = document.getElementById('address').value;
  var addressSplitArray = address.split(" ");
  if (addressSplitArray.lastIndexOf() != "Eugene" || "eugene" || "oregon" || "Oregon" || "OR" || "or" || "Or") {
    address = address + ", Eugene, OR"
  };
  geocoder.geocode({'address': address}, function(results, status) {
    var activity = document.getElementById("activity");
    var inputtedActivity = activity.options[activity.selectedIndex].text;
    var inputtedAddress = $("input#address").val();
    var inputtedTime = $("input#time").val();
    var inputtedDescription = $("input#description").val();
    if (status === 'OK' && inputtedAddress != "" && inputtedActivity != "Select a Category..." && inputtedTime != "") {
      resultsMap.setCenter(results[0].geometry.location);
      var marker = new google.maps.Marker({
        map: resultsMap,
        position: results[0].geometry.location
      });



      var infoWindowText = "Address: " + inputtedAddress + "<br>" + "Type of Incident: " + inputtedActivity + "<br>" + "Time of Incident: " + inputtedTime + "<br>" + "Description of Incident: " + inputtedDescription;

    var infowindow = new google.maps.InfoWindow({
      content: infoWindowText
    });
      marker.addListener('click', function() {
        if( prevInfoWindow ) {
           prevInfoWindow.close();
        }

        prevInfoWindow = infowindow;
         infowindow.open(map, marker);
       });

    } else if (status === 'ZERO_RESULTS' && inputtedActivity != "Select a Category..." && inputtedTime != "") {
       {
      alert("Enter in standard addresses (e.g. 999 Willamette st) or location names (e.g. Eugene Public Library).");
    }
  } else if (inputtedActivity === "Select a Category..." || inputtedTime === "" || inputtedAddress === "") {
    alert ("You must fill out all fields!");
  } else {
    alert("Your address appears to be blank, try again.");
  }
  });
}

//User Interface Logic, Or more appropriately document ready

$(document).ready(function() {
  $("form#dataEntry").submit(function(event) {
    event.preventDefault();

    var inputtedActivity = $("input#activity").val();
    var inputtedAddress = $("input#address").val();
    var inputtedTime = $("input#time").val();
    var inputtedDescription = $("input#description").val();

    resetFields()
  });

});
