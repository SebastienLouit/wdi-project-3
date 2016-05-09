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


router.route('/gameSessionCreate')
  .get(gameSessionsController.gameSessionCreate)

router.route('/gameRoundShow')
  .post(gameSessionsController.gameRoundShow)

router.route('/gameRoundSubmit')
  .post(gameSessionsController.gameRoundSubmit)

router.route('/gameSessionEnd')
  .post(gameSessionsController.gameSessionEnd)


module.exports = router;
