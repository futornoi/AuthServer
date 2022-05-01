const {validationResult} = require("express-validator");
const jwt = require("jsonwebtoken");
const authError = require("../Constants");
const User = require('../Schemas/userSchema');
const Role = require("../Schemas/roleSchema");

const userControllers = {
  getAuthUser: async (req, res) => {
    try {
      const {token} = req.body;
      const {id} = jwt.verify(token, process.env.TOKEN_SECRET);
      const authUser = await User.findById(id, {password: 0});
      res.send(authUser);
    } catch (e) {
      res.status(400).send({msg: authError.SOME})
    }
  },

  getUserList: async (req, res) => {
    try {
      const {id} = req.params;
      const filterOptions = !!id ? {_id: id} : {}

      const usersList = await User.find(filterOptions, {password: 0});
      res.send(usersList);
    } catch (e) {
      console.log(e)
      res.status(400).send({msg: 'Some error'})
    }
  },

  deleteUser: async (req, res) => {
    try {
      const {id} = req.params;
      const deletedUser = await User.findByIdAndDelete(id);
      res.send({msg: `${deletedUser._id} was deleted`});
    } catch (e) {
      console.log(e);
      res.status(400).send({msg: authError.SOME});
    }
  },

  updateUser: async (req, res) => {
    try {
      const {name, email, roles} = req.body;
      const {id} = req.params;

      const errors = validationResult(req);
      if (!errors.isEmpty()) return res.send(errors);

      const role = await Role.findOne({value: roles});
      const candidate = await User.findByIdAndUpdate(id,
        {name, email, roles: [role.value]},
        {returnDocument: "after", projection: {password: 0}});
      if (!candidate) {
        return res.status(404).send({msg: "User not found"})
      }

      res.send(candidate);
    } catch (e) {
      console.log(e)
      res.status(404).send({msg: authError.SOME})
    }

  },

  uploadFile: async (req, res) => {
    try {
      const {id} = req.params;

      if (!req.file) return res.status(404).send(authError.SOME);

      const selectedUser = await User.findByIdAndUpdate(id,
        {imgSrc: req.file.filename},
        {returnDocument: "after", projection: {password: 0}}
      )

      return res.status(200).send(selectedUser);
    } catch (e) {
      console.log(e)
      res.status(404).send(authError.SOME);
    }
  }
}

module.exports = userControllers;