const {Router} = require('express');
const ReservaController = require('../controllers/users.controller');
const loginValidator = require('../middlewares/loginValidator');

const usersRouter = Router();

usersRouter
    .route('/req-users')
    .post(loginValidator,ReservaController.post)
    .get(loginValidator,ReservaController.get)
    .put(loginValidator,ReservaController.put);

module.exports = usersRouter;