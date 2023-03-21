const jwt = require("jsonwebtoken");

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
    //decode not found
    if (!decode) {
        return res.status(404).json({ message: sails.__("notmatch", lang) });
      }
    //find admin
    const admin = await Admin.findOne({ email: decode.email });
    if (admin) {
      return next();
    } else {
      return res.status(401).json({
        message: sails.__("authFail", lang),
      });
    }
  } catch (error) {
    return res.status(401).json({
      error: error,
      message: sails.__("authFail", lang),
    });
  }
};
