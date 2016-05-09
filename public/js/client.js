var StreetSmart = StreetSmart || {};




TemplateApp.ajaxRequest = function(method, url, data) {
  return $.ajax({
    method: method,
    url: url,
    data: data,
  }).done(function(data){
    console.log (data);
  })



StreeSmart.initialize = function () {
  TemplateApp.ajaxRequest()
}


$(function(){
  StreetSmart.initialize();
})