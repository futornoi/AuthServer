const authError = require("../Constants");
const Roles = require("../Schemas/roleSchema");

const rolesController = {
  getRolesList: async (req, res) => {
    try {
      const rolesList = await Roles.find({});
      if(!rolesList) {
        return res.status(400).send({msg: 'Roles has empty'})
      }
      res.send(rolesList);
    } catch {
      res.status(400).send({msg: authError.SOME})
    }
  },
}

module.exports = rolesController