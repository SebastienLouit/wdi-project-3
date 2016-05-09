var express = require("express");
var router  = express.Router();

var usersController           = require('../controllers/users');
var authenticationsController = require('../controllers/authentications');


router.post('/login', authenticationsController.login);
router.post('/register', authenticationsController.register);

router.route('/users')
  .get(usersController.index);

router.route('/users/:id')
  .get(usersController.show)
  .put(usersController.update)

module.exports = router;
