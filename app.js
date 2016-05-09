var express         = require("express");
var morgan          = require("morgan");
var methodOverride  = require("method-override");
var bodyParser      = require("body-parser");
var mongoose        = require("mongoose");
var config          = require("./config/config")
var routes          = require("./config/routes")

var app             = express();

mongoose.connect(config.database);


app.use(morgan('dev'));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));

app.use(methodOverride(function(req, res){
    if (req.body && typeof req.body === "object" && "_method" in req.body){
      var method = req.body_method;
      delete req.body_method;
      return method;
    }
}));

// Error message //
app.use(function (err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    return res.status(401).json({message: 'Unauthorized request.'});
  }
  next();
});

// API Routing //
var routes = require("./config/routes");
app.use("/api", routes);

// Front End //
app.use(express.static(__dirname + "/public"));
app.get("*", function(req,res){
  res.sendFile(_dirname + "/public/index.html")
})


// LETS GO //
app.listen(config.port,function(){
  console.log("Internationales assemble on port ", config.port);
});
