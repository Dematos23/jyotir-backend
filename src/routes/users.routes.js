const {Router} = require('express');
const ReservaController = require('../controllers/users.controller');

const usersRouter = Router();

usersRouter
    .route('/req-users')
    .get(ReservaController.get);

module.exports = usersRouter;