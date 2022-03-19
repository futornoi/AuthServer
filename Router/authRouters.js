const {Router} = require('express');
const {check} = require("express-validator");
const authController = require('../Controllers/authControllers');
const authError = require("../Constants");
const router = Router();

router.post('/signIn', [
  check("password").notEmpty().isLength({min: 4}),
  check("email").notEmpty().isEmail(),
], authController.Auth);

router.post('/registration', [
  check("name", authError.NotEmpty('user name')).notEmpty().trim(),
  check("name", authError.TooSmall(4)).isLength({min: 4}),
  check("password", authError.NotEmpty('password')).notEmpty(),
  check("password", authError.TooSmall(4)).isLength({min: 8}),
  check("email", authError.NotEmpty('email')).notEmpty(),
  check("email", "Invalid email").isEmail()
], authController.Registration);

module.exports = router;