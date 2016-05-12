var GameSession = require("../models/gameSession")
var Round = require("../models/round")

// functions for
// api/games - post:gameSessionCreate ->returns whole obj
// api/games/:id/guesses - post:gameSessionGuess ->returns whole obj


function gameSessionCreate(req, res){
  var gameSession = new GameSession();

  gameSession.save(function(err, gameSession){
    if (err) return res.status(500).send(err);
    res.status(201).json({gameSession: gameSession})
  })
}

function gameSessionGuess(req, res){
  GameSession.findById(req.params.id, function(err, gameSession){
    if (err) return res.status(500).json({ success: false, message: err});
    if (!gameSession) return res.status(500).json({ success: false, message: "Game Session not found!"});
    if (gameSession.status !== "Ongoing") return res.status(500).json({ success: false, message: "Game session no longer active!"})

    var guessLat = req.body.lat;
    var guessLng = req.body.lng;
    gameSession.rounds[gameSession.roundsPlayed].guessLat = guessLat;
    gameSession.rounds[gameSession.roundsPlayed].guessLng = guessLng;

    var roundLat = gameSession.rounds[gameSession.roundsPlayed].lat;
    var roundLng = gameSession.rounds[gameSession.roundsPlayed].lng;

    var latDiff = guessLat - roundLat
    var lngDiff = guessLng - roundLng

    var unprocessedScore = Math.floor(Math.pow((Math.pow(latDiff,2) + Math.pow(lngDiff,2)),0.5) * 10000)
    var score = Math.floor( 5000* (Math.pow(0.997,unprocessedScore)) )
    gameSession.rounds[gameSession.roundsPlayed].score = score

    distance =  (Math.floor( unprocessedScore *11.1))/1000
    gameSession.rounds[gameSession.roundsPlayed].distance = distance

    gameSession.roundsPlayed++
    if (gameSession.roundsPlayed === 5){
      gameSession.status = "Inactive";
      gameSession.totalScore = 0
      for (i = 0; i < gameSession.rounds.length; i++){
          gameSession.totalScore += gameSession.rounds[i].score;
      }
    }

    gameSession.save(function(err){
      if(err){
        return res.status(500).json({ success: false, message: err})
      }
        return res.status(201).json({gameSession: gameSession
        })
    })
  })
}


module.exports = {
  gameSessionCreate:    gameSessionCreate,
  gameSessionGuess:     gameSessionGuess
}
