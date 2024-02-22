const userRoute = require("express").Router();
const validate = require("../middleware/validate");
const { login, createUser } = require("../controller/user.controller");
const { loginUser, create } = require("../validate/user.validate");

userRoute.post("/login", validate(loginUser), login);

userRoute.post("/createuser", validate(create), createUser);

module.exports = userRoute;
