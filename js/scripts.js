//
//
// function initMap() {
//   var eugene = {lat: 44.049301, lng: -123.095047};
//   var map = new google.maps.Map(document.getElementById('map'), {
//     zoom: 14,
//     center: eugene
//   });
//   var marker = new google.maps.Marker({
//     position: eugene,
//     map: map
//   });
// }
//
// var geocoder;
// var map;
// var address ="San Diego, CA";
// function initialize() {
//   geocoder = new google.maps.Geocoder();
//   var latlng = new google.maps.LatLng(-34.397, 150.644);
//   var myOptions = {
//     zoom: 8,
//     center: latlng,
//   mapTypeControl: true,
//   mapTypeControlOptions: {style: google.maps.MapTypeControlStyle.DROPDOWN_MENU},
//   navigationControl: true,
//     mapTypeId: google.maps.MapTypeId.ROADMAP
//   };
//   map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);
//   if (geocoder) {
//     geocoder.geocode( { 'address': address}, function(results, status) {
//       if (status == google.maps.GeocoderStatus.OK) {
//         if (status != google.maps.GeocoderStatus.ZERO_RESULTS) {
//         map.setCenter(results[0].geometry.location);
//
//           var infowindow = new google.maps.InfoWindow(
//               { content: '<b>'+address+'</b>',
//                 size: new google.maps.Size(150,50)
//               });
//
//           var marker = new google.maps.Marker({
//               position: results[0].geometry.location,
//               map: map,
//               title:address
//           });
//           google.maps.event.addListener(marker, 'click', function() {
//               infowindow.open(map,marker);
//           });
//
//         } else {
//           alert("No results found");
//         }
//       } else {
//         alert("Geocode was not successful for the following reason: " + status);
//       }
//     });
//   }
// }

function resetFields() {
  $("input#activity").val("");
  $("input#address").val("");
  $("input#time").val("");
  $("input#description").val("");
}

function initMap() {
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 14,
    center: {lat: 44.049301, lng: -123.095047}
  });


  var geocoder = new google.maps.Geocoder();
//       var inputtedActivity = $("input#activity").val();
//
//   var contentString = "Type of Activity: " + inputtedActivity;
//
//   var infowindow = new google.maps.InfoWindow({
//     content: contentString
// });

  document.getElementById('submit').addEventListener('click', function() {
    geocodeAddress(geocoder, map);
  });
  // var userData =
}

function geocodeAddress(geocoder, resultsMap) {
  var address = document.getElementById('address').value;
  geocoder.geocode({'address': address}, function(results, status) {
    var activity = document.getElementById("activity");
    var inputtedActivity = activity.options[activity.selectedIndex].text;
    var inputtedAddress = $("input#address").val();
    var inputtedTime = $("input#time").val();
    var inputtedDescription = $("input#description").val();
    if (status === 'OK' && inputtedAddress != "" && inputtedActivity != "Select a Category..." && inputtedTime != "") {
      console.log(inputtedActivity, inputtedAddress, inputtedTime, inputtedDescription);
      resultsMap.setCenter(results[0].geometry.location);
      var marker = new google.maps.Marker({
        map: resultsMap,
        position: results[0].geometry.location
      });

      var contentString = "Incident Description: " + inputtedDescription;

    var infowindow = new google.maps.InfoWindow({
      content: contentString
    });
      marker.addListener('click', function() {
         infowindow.open(map, marker);
       });

    } else if (status === 'ZERO_RESULTS' && inputtedActivity != "Select a Category..." && inputtedTime != "") {
       {
      alert("Enter in standard addresses (e.g. 999 Willamette st) or location names (e.g. Eugene Public Library).");
    }
  } else if (inputtedActivity === "Select a Category..." || inputtedTime === "" || inputtedAddress === "") {
    console.log(inputtedActivity, inputtedAddress, inputtedTime, inputtedDescription);
    alert ("You must fill out all fields!");
  } else {
    alert("Your address appears to be blank, try again.");
  }
  });
}

//User Interface Logic

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
