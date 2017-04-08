function initMap() {
  var eugene = {lat: 44.049301, lng: -123.095047};
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 14,
    center: eugene
  });
  var marker = new google.maps.Marker({
    position: eugene,
    map: map
  });
}
