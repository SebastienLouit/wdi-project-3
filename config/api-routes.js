var express = require("express");
var router  = express.Router();

var usersController           = require('../controllers/users');
var authenticationsController = require('../controllers/authentications');
var gameSessionsController = require('../controllers/gameSessions')

router.post('/login', authenticationsController.login);
router.post('/register', authenticationsController.register);

router.route('/users')
  .get(usersController.index);

router.route('/users/:id')
  .get(usersController.show)
  .put(usersController.update)


router.route('/games')
  .post(gameSessionsController.gameSessionCreate)

router.route('/games/:id/guesses')
  .post(gameSessionsController.gameSessionGuess)

module.exports = router;
