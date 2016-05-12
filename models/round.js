var mongoose = require("mongoose");

var roundSchema = new mongoose.Schema({
  lat: Number,
  lng: Number,
  score: Number,
  distance: Number
})

module.exports = mongoose.model("Round", roundSchema)
