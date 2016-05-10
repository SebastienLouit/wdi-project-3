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


  function generateLat(){
    return (51.465010 + (Math.random() * 0.110659))
  }

  function generateLng(){
    return (-0.377312 + (Math.random() * 0.558930))
  }

  // 51.465010
  // -0.377312
  // (down left corner)
  //
  // lat : 51.575669
  // log : 0.181618
  // (this is top right corner)



},{
  timestamps: true
})

module.exports = mongoose.model("gameSession", gameSessionSchema)
