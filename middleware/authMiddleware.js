const authError = require("../Constants");
const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  if(req.methods === 'OPTIONS') next()

  try {
    const token = req.headers.authorization.split(' ')[1];
    if(!token) return res.status(403).json({msg: authError.NOT_AUTHORISATION});

    req.user = jwt.verify(token, process.env.TOKEN_SECRET);
    next();
  } catch (e) {
    return res.status(403).json({msg: authError.NOT_AUTHORISATION});
  }
}