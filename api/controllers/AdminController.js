const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
dotenv.config();
// const bootstrap=require('config/bootstrap.js')

module.exports = {
  //admin signup
  adminSignup: async (req, res) => {
    const lang = req.getLocale();
    const { username, email, password } = req.body;
    //find admin
    const admin = await Admin.find({ email});

    //check admin find or not!!

    if (admin) {
      //checke email already exists or not

      if (admin.length >= 1) {
        return res.status(409).json({
          message: sails.__("email", lang),
        });
      }
      try {
        //creating hash password using hashSync
        const hash = bcrypt.hashSync(password, 10);
        // create admin
        const newAdmin = await Admin.create({
          username,
          email,
          password: hash,
        }).fetch();

        return res.status(201).json({
          message: sails.__("addData", lang),
          newAdmin: newAdmin,
        });
      } catch (error) {
        return res.status(500).json({
          message: sails.__("notAdded", lang),
        });
      }
    } else {
      return res.status(500).json({
        message: sails.__("notAdded", lang),
      });
    }
  },

  //admin login

  adminLogin: async (req, res) => {
    const lang = req.getLocale();
    try {
      const { email, password } = req.body;
      //find admin
      const admin = await Admin.findOne({ email:email });
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
      console.log(email);
      const admin = await Admin.findOne({ email });
      console.log(admin);
      const userUpdate = await Admin.updateOne({ email }).set({ token: " " });
      console.log(userUpdate);
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
