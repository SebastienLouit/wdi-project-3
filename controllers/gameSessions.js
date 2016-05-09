var GameSession = require("../models/gameSession")

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

function gameSessionsCreate(req,res){

  var gameSession = new GameSession({ round1Lat: generateLat(),
                      round1Lng: generateLng(),
                      round2Lat: generateLat(),
                      round2Lng: generateLng(),
                      round3Lat: generateLat(),
                      round3Lng: generateLng(),
                      round4Lat: generateLat(),
                      round5Lat: generateLat(),
                      round4Lng: generateLng(),
                      round5Lng: generateLng()
                      // user:       PLACEHOLDER to do
  })

  gameSession.save(function(err, gameSession){
    if (err) return res.status(500).send(err);
    res.status(201).json({gameSessionId: gameSession._id})
  })
}

function gameRoundShow(req,res){
  var gameSessionId = req.params.gameSessionId;
  var round = req.params.round;

  gameSession.findBy({_id: gameSessionId}, function(err, gameSession){
    if (err) return res.status(500).send(err);
    if (!gameSession) return res.status(400).send(err);

    var roundLatKey = "round" + round + "Lat";
    var roundLngKey = "round" + round + "Lng";
    var lat = gameSession[roundLatKey];
    var lng = gameSession[roundLngKey];
    res.status(200).json({lat: lat, lng: lng})
  })
}

function gameSessionEnd(req, res){
  gameSession.findBy({_id: gameSessionId}, function(err, gameSession){
    if (err) return res.status(500).send(err);
    if (!gameSession) return res.status(400).send(err);

    finalScore = gameSession[round1Score] +  gameSession[round2Score] +  gameSession[round3Score] +  gameSession[round4Score] +  gameSession[round5Score];

    res.status(200).json({score: finalScore})
  }
}

function gameRoundSubmit(req, res){
  var gameSessionId = req.params.gameSessionId;
  var lat = req.params.lat;
  var lng = req.params.lng;
  var round = req.params.round;

  gameSession.findBy({_id: gameSessionId}, function(err, gameSession){
    if (err) return res.status(500).send(err);
    if (!gameSession) return res.status(400).send(err);

    var roundLatKey = "round" + round + "Lat";
    var roundLngKey = "round" + round + "Lng";
    var roundLat = gameSession[roundLatKey];
    var roundLng = gameSession[roundLngKey];

    var latDiff = lat - roundLat;
    var lngDiff = lng - roundLng;

    var score = (latDiff^2 + lngDiff^2)^0.5

    res.status(200).json({ansLat: roundLat, ansLng: roundLng, score: score})
  })
}

module.exports = {
  gameSessionCreate:    gameSessionCreate,
  gameRoundShow:        gameRoundShow,
  gameRoundSubmit:      gameRoundSubmit,
  gameSessionEnd:       gameSessionEnd,
}
//
// var gameSessionsController = require('../controllers/gameSessions')
//
// router.route('/gameSessionCreate')
//   .get(gameSessionsController.gameSessionCreate)
//
// router.route('/gameRoundShow')
//   .post(gameSessionsController.gameRoundShow)
//
// router.route('/gameRoundSubmit')
//   .post(gameSessionsController.gameRoundSubmit)
//
// router.route('/gameSessionEnd')
//   .post(gameSessionsController.gameSessionEnd)
