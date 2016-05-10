var mongoose = require("mongoose");
var Round = require("./round");

var gameSessionSchema = new mongoose.Schema({
  rounds: [Round.schema],
  totalScore: Number,
  user: { type: mongoose.Schema.ObjectId, ref: 'User' },
  roundsPlayed: Number,
  status: String
},{
  timestamps: true
})

gameSessionSchema.pre('save', function(next) {
  for (i = this.rounds.length; this.rounds.length < 5; i++ ){
    roundLat = (51.465010 + (Math.random() * 0.110659));
    roundLng = (-0.377312 + (Math.random() * 0.558930));
    round = new Round({
      lat: roundLat,
      lng: roundLng
    });
    this.rounds.push(round);
  }
  next();
})

module.exports = mongoose.model("gameSession", gameSessionSchema)

// gameSessionSchema.pre('save', function(next) {
//   now = new Date();
//   this.updatedAt = now;
//   if (!this.createdAt) {
//     this.createdAt = now
//   }
//   next();
// })
