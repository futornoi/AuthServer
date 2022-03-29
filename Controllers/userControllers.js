const User = require('../Schemas/userSchema');
const jwt = require("jsonwebtoken");

const userControllers = {
  getAuthUser: async (req, res) => {
    try {
      const {token} = req.body;
      const {id} = jwt.verify(token, process.env.TOKEN_SECRET);
      const authUser = await User.findById(id, {password: 0});
      res.send(authUser);
    } catch (e) {
      res.status(400).send({msg: 'Some error'})
    }
  },
  getUserList: async (req, res) => {
    try {
      const usersList = await User.find({}, {password: 0});
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
      res.status(400).send({msg: 'Some error'});
    }
  }
}

module.exports = userControllers;