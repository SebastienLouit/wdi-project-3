var mongoose = require("mongoose");

var gameSessionSchema = mongoose.Schema({
  round1Score:  Number,
  round2Score:  Number,
  round3Score:  Number,
  round4Score:  Number,
  round5Score:  Number,
  user: { type: mongoose.Schema.ObjectId, ref: 'User' }
},
  totalScore: Number
},{
  timestamps: true
})

module.exports = mongoose.model("User", animalSchema)
