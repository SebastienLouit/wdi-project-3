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

    //THESE ARE THE PROBLEMS
    var guessLat = req.params.lat;
    var guessLng = req.params.lng;


    var roundLat = gameSession.rounds[gameSession.roundsPlayed].lat;
    var roundLng = gameSession.rounds[gameSession.roundsPlayed].lng;

    var latDiff = guessLat - roundLat
    var lngDiff = guessLng - roundLng

    var score = (latDiff^2 + lngDiff^2)^0.5
    gameSession.rounds[gameSession.roundsPlayed].score = score

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
        return res.status(201).json({gameSession: gameSession,
          guessLat: guessLat,
          roundLat: roundLat,
          latDiff: latDiff
        })
    })
  })
}


module.exports = {
  gameSessionCreate:    gameSessionCreate,
  gameSessionGuess:     gameSessionGuess
}


// 5731fccdc763276a403dd103
// {
//     "lat": 51.53365782314569,
//     "lng": -0.17794667697982658
// }
