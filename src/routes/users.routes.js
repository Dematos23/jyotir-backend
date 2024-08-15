const {Router} = require('express');
const ReservaController = require('../controllers/users.controller');
const loginValidator = require('../middlewares/loginValidator');

const usersRouter = Router();

usersRouter
    .route('/req-users')
    .get(loginValidator,ReservaController.get);

module.exports = usersRouter;