const {validationResult} = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authError = require("../Constants");
const User = require("../Schemas/userSchema");
const Role = require("../Schemas/roleSchema");

const generateAccessToken = (id, roles) => {
  const payload = { id, roles };
  return jwt.sign(payload, process.env.TOKEN_SECRET, {expiresIn: '24h'});
}

const authController = {
  Auth: async (req, res) => {
    try {
      const {email, password} = req.body;

      const errors = validationResult(req);
      if(!errors.isEmpty()) return res.send(errors);

      const authUser = await User.findOne({email});
      if (!authUser) return res.status(400).json({
        key: 'email',
        msg: authError.InvalidData('email')
      });

      const validPassword = bcrypt.compareSync(password, authUser.password);
      if(!validPassword) return res.status(400).json({
        key: 'password',
        msg: authError.InvalidData('password')
      });

      const token = generateAccessToken(authUser._id, authUser.roles);
      return res.send({token})

    } catch (e) {
      console.log(e)
      res.status(400).json({msg: authError.AUTHORISATION_ERROR});
    }
  },
  Registration: async (req, res) => {
    try {
      const {name, email, password} = req.body;

      const errors = validationResult(req);
      if (!errors.isEmpty()) return res.status(400).send(errors);

      const candidate = await User.find({email});
      if (!!candidate?.length) return res.status(400).send({
        key: "email",
        msg: authError.EMAIL_BUSY,
      });

      const role = await Role.findOne({value: "USER"});
      const newUser = new User({
        name,
        email,
        password: bcrypt.hashSync(password, 6),
        roles: [role.value],
      });
      const userRes = await newUser.save();
      return res.send(userRes);
    } catch (e) {
      console.log(e)
      res.status(400).json({msg: authError.REGISTRATION_ERROR});
    }
  }
}

module.exports = authController
