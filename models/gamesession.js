var mongoose = require("mongoose");

var gameSessionSchema = mongoose.Schema({
  round1Score:  Number,
  round1Lat:    String,
  round1Lng:    String,

  round2Score:  Number,
  round2Lat:    String,
  round2Lng:    String,

  round3Score:  Number,
  round3Lat:    String,
  round3Lng:    String,

  round4Score:  Number,
  round4Lat:    String,
  round4Lng:    String,

  round5Score:  Number,
  round5Lat:    String,
  round5Lng:    String,


  user: { type: mongoose.Schema.ObjectId, ref: 'User' },
  totalScore: Number
},{
  timestamps: true
})

module.exports = mongoose.model("gameSession", gameSessionSchema)
