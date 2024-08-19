const { Router } = require("express");
const {login} = require("../controllers/auth.controller");
const activeUserValidator = require("../middlewares/activeUserValidator");

const authRouter = Router();

authRouter.post("/login",activeUserValidator, login);

module.exports = authRouter;