var Authentication = authentication || {}

Authentication.ajaxRequest = function (url, data) {
  return $ajax({
    method : post,
    url: "http://localhost:3000/api" + url,
    data: data
  }).done(function(){
    console.log(data)
  }).fail(function(){
    console.log(data.responseJSON.message);
  })
}

Authentication.submitForm = function(){
  event.prevantDefault();

  var url = $(this).attr("action")
  var data = $(this).serialize();
}


Authentication.setRequestHeader = function(xhr, setting){
  var token = authentication.getToken();
   if (token) return xhr.setRequestHeader("Authorization", "Bearer " + token)
}

Authentication.getToken = function(){
  return window.localStorage.getItem("token")
}

Authentication.setToken = function(token){
  return window.localStorage.setItem("token", token)
}


Authentication.saveTokenIfPresent = function(data){
  if (data.token) return this.setToken(data.token)
  return false;
}

Authentication.initialize = function () {
  authentication.ajaxRequest();
}

$(function(){
  $("form").on("submit", this.submitForm);
})
