var mongoose = require("mongoose");

var roundSchema = new mongoose.Schema({
  lat: Number,
  lng: Number,
  score: Number
})

module.exports = mongoose.model("Round", roundSchema)


// roundSchema.methods.generateRound = function(cb){
//   this.lat = generateLat();
//   this.lng = generateLng();
// }
//
// roundSchema.methods.generateLat = function(){
//   return (51.465010 + (Math.random() * 0.110659))
// }
//
// roundSchema.methods.generateLng = function(){
//   return (-0.377312 + (Math.random() * 0.558930))
// }
