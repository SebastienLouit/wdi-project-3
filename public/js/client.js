var StreetSmart = StreetSmart || {}



StreetSmart.generateMap = function(){
  var london = { lat: 51.50, lng: -0.08 };
  var map = new google.maps.Map(document.getElementById('map-canvas'), {
    zoom: 12,
    center: london
  });
  // This event listener calls addMarker() when the map is clicked.
  google.maps.event.addListener(map, 'click', function(event) {
    if (!StreetSmart.marker) {
      StreetSmart.marker = new google.maps.Marker({
        position: event.latLng,
        map: map
      });
    } else { 
      StreetSmart.marker.setPosition(event.latLng); 
    }
    var myLatLng = event.latLng;
    StreetSmart.lat = myLatLng.lat();
    StreetSmart.lng = myLatLng.lng();
  });
}

StreetSmart.makeGuess = function() {
  event.preventDefault();
  // Have the gameId, gameId
  // Ajax back to backEnd
  return console.log(StreetSmart.lat, StreetSmart.lng);
}

StreetSmart.getTemplate = function(tpl, data, url){
  var templateUrl = "http://localhost:3000/templates/" + tpl + ".html";

  return $.ajax({
    url: templateUrl,
    method: "GET",
    dataType: "html"
  }).done(function(templateData){
    // Use the underscore .template function to parse the template
    var parsedTemplate   = _.template(templateData);
    // Fills in the <%= %>, <% %> with data
    var compiledTemplate = parsedTemplate(data);
    // Replace the html inside main with the compiled template
    $("main").html(compiledTemplate);
    StreetSmart.generateMap()
  })
}

StreetSmart.formSubmit = function(){
  event.preventDefault();
  var method = $(this).attr("method");
  var url    = $(this).attr("action");
  // This is the template we want to go to AFTER the form submit
  var tpl    = $(this).data("template");
  // This gets all the data from the form, you MUST have names on the inputs
  var data   = $(this).serialize();
  return StreetSmart.apiAjaxRequest(url, method, data, tpl);
}

StreetSmart.linkClick = function(){
  // If it has a data attribute of external, then it's an external link
  var external = $(this).data("external");
  // Don't prevent the default and actually just follow the link
  if (external) return;
  // Stop the browser from following the link
  event.preventDefault();
  // Get the url from the link that we clicked
  var url = $(this).attr("href");
  // Get which template we need to render
  var tpl = $(this).data("template");
  // If there is a href defined on the a link, then get the data
  if (url) return StreetSmart.apiAjaxRequest(url, "get", null, tpl);
  // If there isn't a href, just load the template
  return StreetSmart.getTemplate(tpl, null, url);
}


StreetSmart.bindLinkClicks = function(){
  // Event delegation
  $("body").on("click", "a", this.linkClick);
  $("body").on("click", ".guess", this.makeGuess);
  
}

StreetSmart.bindFormSubmits = function(){
  // Event delegation
  $("body").on("submit", "form", this.formSubmit);
}

// // Ajax request to get data from API
StreetSmart.apiAjaxRequest = function(url, method, data, tpl){
  return $.ajax({
    type: method,
    url: "http://localhost:3000"+ url,
    data: data,
  }).done(function(data){
    console.log(data);
    if (tpl) return StreetSmart.getTemplate(tpl, data, url);
  }).fail(function(response){
    StreetSmart.getTemplate("error", null, url);
  });
}


StreetSmart.initialize = function () {
  this.bindLinkClicks();
  this.bindFormSubmits();
}

$(function(){
  StreetSmart.initialize();
})