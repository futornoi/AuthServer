const User = require('../Schemas/userSchema');

const userControllers = {
  getUserList: async (req, res) => {
    try {
      const usersList = await User.find();
      res.send(usersList);
    } catch (e) {
      console.log(e)
      res.status(400).send({msg: 'Some error'})
    }
  }
}

module.exports = userControllers;