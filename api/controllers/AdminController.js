const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
dotenv.config();
// const bootstrap=require('config/bootstrap.js')

module.exports = {
  //admin login

  adminLogin: async (req, res) => {
    const lang = req.getLocale();
    try {
      const { email, password } = req.body;
      //find admin
      const admin = await Admin.findOne({ email: email });
      //compare password
      const checkpass = await bcrypt.compare(password, admin.password);
      if (checkpass === true) {
        try {
          //generate token
          const token = await sails.helpers.generateToken(
            email,
            admin.id,
            "8h"
          );
          //add token in database
          await Admin.updateOne({ email }, { token: token });
          return res.status(200).json({
            message: sails.__("token", lang),
            token: token,
          });
        } catch (error) {
          console.log(error);
          return res.status(500).json({
            error: error + "err",
            message: sails.__("nottoken", lang),
          });
        }
      } else {
        return res.status(200).json({
          message: sails.__("token", lang),
          token: token,
        });
      }
    } catch (error) {
      return res.status(500).json({
        message: sails.__("notToken", lang),
      });
    }
  },

  //admin logout

  adminLogout: async (req, res) => {
    const lang = req.getLocale();

    try {
      console.log(req.userData);
      const { email } = req.userData;
     // find admin
      const admin = await Admin.findOne({ email });
      //update if admin logout then token null
      const userUpdate = await Admin.updateOne({ email }).set({ token: " " });
      return res.status(200).json({
        message: sails.__("userLogout", lang),
      });
    } catch (error) {
      return res.status(500).json({
        message: sails.__("notLogout", lang),
      });
    }
  },
};
