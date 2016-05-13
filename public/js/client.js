var StreetSmart = StreetSmart || {}
var GameSession = GameSession || {}

StreetSmart.getUrl = function(){
  if (window.location.href.indexOf("localhost") !== -1){
    StreetSmart.url = "http://localhost:3000";
  } else {
    StreetSmart.url = "https://streetsmartgame.herokuapp.com"
  }
}

StreetSmart.generateStreetView = function(map) {
  // FEED IN LAT AND LNG FOR LOCATION
  var lat = GameSession.rounds[GameSession.roundsPlayed].lat
  var lng = GameSession.rounds[GameSession.roundsPlayed].lng
  var sv = new google.maps.StreetViewService();

  var makePanorama = function(radius){
    sv.getPanorama(
      {location: new google.maps.LatLng(lat, lng), radius: radius},
      function(data) {
        if (!data){
          return makePanorama(radius+25);
        }
        var lat = data.location.latLng.lat();
        var lng = data.location.latLng.lng();
        var panorama = new google.maps.StreetViewPanorama(
          document.getElementById('pano'), {
            position: {
              lat: lat,
              lng: lng
            },
            addressControl: false
          }
          )
      }
      );
  }
  makePanorama(0);
}

StreetSmart.generateMap = function(){
  var london = { lat: 51.50, lng: -0.08 };
  var map = new google.maps.Map(document.getElementById('map-canvas'), {
    zoom: 10,
    center: london,
    streetViewControl: false,
    styles: [
    {
      "featureType": "administrative.locality",
      "elementType": "all",
      "stylers": [
      {
        "hue": "#ff0200"
      },
      {
        "saturation": 7
      },
      {
        "lightness": 19
      },
      {
        "visibility": "on"
      }
      ]
    },
    {
      "featureType": "administrative.locality",
      "elementType": "labels.text",
      "stylers": [
      {
        "visibility": "on"
      },
      {
        "saturation": "-3"
      }
      ]
    },
    {
      "featureType": "administrative.locality",
      "elementType": "labels.text.fill",
      "stylers": [
      {
        "color": "#748ca3"
      }
      ]
    },
    {
      "featureType": "landscape",
      "elementType": "all",
      "stylers": [
      {
        "hue": "#ff0200"
      },
      {
        "saturation": -100
      },
      {
        "lightness": 100
      },
      {
        "visibility": "simplified"
      }
      ]
    },
    {
      "featureType": "poi",
      "elementType": "all",
      "stylers": [
      {
        "hue": "#ff0200"
      },
      {
        "saturation": "23"
      },
      {
        "lightness": "20"
      },
      {
        "visibility": "off"
      }
      ]
    },
    {
      "featureType": "poi.school",
      "elementType": "geometry.fill",
      "stylers": [
      {
        "color": "#ffdbda"
      },
      {
        "saturation": "0"
      },
      {
        "visibility": "on"
      }
      ]
    },
    {
      "featureType": "road",
      "elementType": "geometry",
      "stylers": [
      {
        "hue": "#ff0200"
      },
      {
        "saturation": "100"
      },
      {
        "lightness": 31
      },
      {
        "visibility": "simplified"
      }
      ]
    },
    {
      "featureType": "road",
      "elementType": "geometry.stroke",
      "stylers": [
      {
        "color": "#f39247"
      },
      {
        "saturation": "0"
      }
      ]
    },
    {
      "featureType": "road",
      "elementType": "labels",
      "stylers": [
      {
        "hue": "#008eff"
      },
      {
        "saturation": -93
      },
      {
        "lightness": 31
      },
      {
        "visibility": "on"
      }
      ]
    },
    {
      "featureType": "road.arterial",
      "elementType": "geometry.stroke",
      "stylers": [
      {
        "visibility": "on"
      },
      {
        "color": "#ffe5e5"
      },
      {
        "saturation": "0"
      }
      ]
    },
    {
      "featureType": "road.arterial",
      "elementType": "labels",
      "stylers": [
      {
        "hue": "#bbc0c4"
      },
      {
        "saturation": -93
      },
      {
        "lightness": -2
      },
      {
        "visibility": "simplified"
      }
      ]
    },
    {
      "featureType": "road.arterial",
      "elementType": "labels.text",
      "stylers": [
      {
        "visibility": "off"
      }
      ]
    },
    {
      "featureType": "road.local",
      "elementType": "geometry",
      "stylers": [
      {
        "hue": "#ff0200"
      },
      {
        "saturation": -90
      },
      {
        "lightness": -8
      },
      {
        "visibility": "simplified"
      }
      ]
    },
    {
      "featureType": "transit",
      "elementType": "all",
      "stylers": [
      {
        "hue": "#e9ebed"
      },
      {
        "saturation": 10
      },
      {
        "lightness": 69
      },
      {
        "visibility": "on"
      }
      ]
    },
    {
      "featureType": "water",
      "elementType": "all",
      "stylers": [
      {
        "hue": "#e9ebed"
      },
      {
        "saturation": -78
      },
      {
        "lightness": 67
      },
      {
        "visibility": "simplified"
      }
      ]
    }
    ]
  });
  if (GameSession.status === "Ongoing"){
    this.generateStreetView(map);
  }
  StreetSmart.marker = null;
  StreetSmart.map = map
  // This event listener calls addMarker() when the map is clicked.
  if (!!($("div.row div.col-xs-1").length)){
    google.maps.event.addListener(map, 'click', function(event) {
      var image = "/images/black-pin.png"
      if (!StreetSmart.marker) {
        StreetSmart.marker = new google.maps.Marker({
          position: event.latLng,
          map: map,
          icon: image
        });
      } else {
        StreetSmart.marker.setPosition(event.latLng);
      }
      var myLatLng = event.latLng;
      StreetSmart.lat = myLatLng.lat();
      StreetSmart.lng = myLatLng.lng();
    });
  }

}

StreetSmart.makeGuess = function() {
  var gameId  = GameSession._id
  event.preventDefault();
  return $.ajax({
    url: StreetSmart.url + "/api/games/"+gameId+"/guesses",
    method: "POST",
    data: { lat: StreetSmart.lat, lng: StreetSmart.lng }
  }).done(function (data){
    var url = "score"
    var tpl = "score"
    GameSession = data.gameSession
    StreetSmart.getTemplate(tpl, data, url)
    return(data)
  })
}

StreetSmart.getTemplate = function(tpl, data, url){
  var templateUrl = StreetSmart.url + "/templates/" + tpl + ".html";
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
    switch (tpl){

      case "home":
      $("main").html(compiledTemplate)
      $(".homeTem").hide().fadeIn(400)
      break;

      case "rules":
      $(".homeTem").slideUp(300, function(){
        $("main").html(compiledTemplate)
        $(".rulesTem").hide().fadeIn(300)
      })
      break;

      case "map":
      var tem = ""
      !!($(".homeTem").length) ? tem = "div.homeTem" : tem = "div.rulesTem";
      !!($(".scoreTem").length) ? tem = "div.scoreTem" : null ;
      !!($(".finalscoreTem").length) ? tem = "div.finalscoreTem" : null ;
      $(tem).slideUp(300, function(){
        $("main").html(compiledTemplate)
        StreetSmart.generateMap();
      })
      break;

      case "score":
      $("main").html(compiledTemplate)
      StreetSmart.generateMap();
      break;

      case "finalscore":
      $(".scoreTem").slideUp(300, function(){
        $("main").html(compiledTemplate)
        $(".finalscoreTem").hide().fadeIn(300)
      })
      break;

      default:
      $("main").html(compiledTemplate).show();
    }
    if( tpl === "score"){
      //Run just for score
    }
    google.maps.event.addListenerOnce(StreetSmart.map, 'idle', function(){

      var image = "/images/black-pin.png"
      var image2 = "/images/red-pin.png"
      if(tpl === "score"){
        var marker1 = new google.maps.Marker({
          position: {lat: GameSession.rounds[GameSession.roundsPlayed-1].lat,
           lng: GameSession.rounds[GameSession.roundsPlayed-1].lng},
           draggable: true,
           animation: google.maps.Animation.DROP,
           map: StreetSmart.map,
           icon: image2
         })
        var marker2 = new google.maps.Marker({
          position: {lat: GameSession.rounds[GameSession.roundsPlayed-1].guessLat,
           lng: GameSession.rounds[GameSession.roundsPlayed-1].guessLng},
           map: StreetSmart.map,
           icon: image
         })
        var gLineCoordonates = [
        {lat: GameSession.rounds[GameSession.roundsPlayed-1].lat,
         lng: GameSession.rounds[GameSession.roundsPlayed-1].lng},
         {lat: GameSession.rounds[GameSession.roundsPlayed-1].guessLat,
           lng: GameSession.rounds[GameSession.roundsPlayed-1].guessLng}
           ];
           var gLine = new google.maps.Polyline({
            map: StreetSmart.map,
            path: gLineCoordonates,
            geodesic: true,
            strokeColor: '#8E0E00',
            strokeOpacity: 1.0,
            strokeWeight: 2
          });
         }
       });
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
  var method = $(this).attr("method");
  // Get which template we need to render
  var tpl = $(this).data("template");
  // If there is a href defined on the a link, then get the data
  if (url) return StreetSmart.apiAjaxRequest(url, method, null, tpl);
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

// // Ajax request to get data from API - KEEP FADUMA VERSION
StreetSmart.apiAjaxRequest = function(url, method, data, tpl){
  return $.ajax({
    type: method,
    url: StreetSmart.url + url,
    data: data,
  }).done(function(data){
    if (url = "/api/games") StreetSmart.getGameSession(data);
    if (tpl) return StreetSmart.getTemplate(tpl, data, url);
  }).fail(function(response){
    StreetSmart.getTemplate("error", null, url);
  });
}

StreetSmart.getGameSession = function(data){
 GameSession = data.gameSession;
}


StreetSmart.initialize = function () {
  this.bindLinkClicks();
  this.bindFormSubmits();
  this.getUrl();
}
// StreetSmart.hidePano = function {
//   $("#pano").hide()
// }

StreetSmart.roundScore = function(){
  return GameSession.rounds[GameSession.roundsPlayed-1].score
}

$(function(){
  StreetSmart.initialize();
  StreetSmart.getTemplate("home", null, "home");
})
