const authError = require("../Constants");
const jwt = require("jsonwebtoken");

module.exports = (rolesArray) => (req, res, next) => {
  if (req.methods === 'OPTIONS') next()

  try {
    const token = req.headers.authorization.split(' ')[1];
    if (!token) return res.status(400).json({msg: authError.NOT_AUTHORISATION});

    const {roles} = jwt.verify(token, process.env.TOKEN_SECRET);

    let hasRole = false;
    roles.forEach(role => {
      if (rolesArray.includes(role)) hasRole = true
    })

    if(!hasRole) return res.status(403).json({msg: authError.ACCESS_DENIED});

    next();
  } catch (e) {
    return res.status(403).json({msg: authError.NOT_AUTHORISATION});
  }
}