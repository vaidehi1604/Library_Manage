const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

module.exports = async (req, res, next) => {
  const lang = req.getLocale();

  try {
    //set token
    const token = await req.headers.authorization.split(" ")[1];
    //verify token
    const decode = await sails.helpers.verifyToken.with({
      token: token,
    });
    req.userData = decode;
    //find user 
    const user = await User.findOne({ email: decode.email });
    if (!decode) {
      return res.status(404).json({ message: sails.__("notmatch", lang) });
    }

    if (user) {
      return next();
    } else {
      return res.status(401).json({ message: sails.__("authFail", lang) });
    }
  } catch (error) {
    return res.status(401).json({
      message: sails.__("authFail", lang),
    });
  }
};
