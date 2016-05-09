var StreetSmart = StreetSmart || {};


StreetSmart.generateMap = function(){
  var london = { lat: 51.50, lng: -0.08 };
  var map = new google.maps.Map(document.getElementById('map-canvas'), {
    zoom: 12,
    center: london
  });
  // This event listener calls addMarker() when the map is clicked.
  google.maps.event.addListener(map, 'click', function(event) {
    addMarker(event.latLng, map);
  });
  // Add a marker at the center of the map.
  addMarker(london, map);
}


// Adds a marker to the map.
function addMarker(location, map) {
  var marker = {}
  var marker = new google.maps.Marker({
    position: location,
    map: map
  });
  console.log(location)
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
  console.log(this)
}

StreetSmart.bindFormSubmits = function(){
  // Event delegation
  $("body").on("submit", "form", this.formSubmit);
}

////////----///////

// StreetSmart.ajaxRequest = function(method, url, data) {
//   return $.ajax({
//     method: method,
//     url: url,
//     data: data,
//   }).done(function(data){
//     console.log (data);
//   })
// }


StreetSmart.initialize = function () {
  this.bindLinkClicks();
  this.bindFormSubmits();
}

$(function(){
  StreetSmart.initialize();
})