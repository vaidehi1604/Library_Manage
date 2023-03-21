const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
dotenv.config();

module.exports = {
  //user signup
  userSignup: async (req, res) => {
    const lang = req.getLocale();
    const { username, email, password ,token} = req.body;
    //find user
    const user = await User.find({ email:email});

    //check find or not!!
    if (user) {
      //checke email already exists or not

      if (user.length >= 1) {
        return res.status(409).json({
          message: sails.__("email", lang),
        });
      }
      try {
        //creating hash password using hashSync
        const hash = bcrypt.hashSync(password, 10);
        // create user
        const newUser = await User.create({
          username,
          email,
          password: hash,
          token:' '
        }).fetch();

        return res.status(201).json({
          message: sails.__("addData", lang),
          newUser: newUser,
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

  //user login

  userLogin: async (req, res) => {
    const lang = req.getLocale();
    try {
      const { email, password } = req.body;
      //find user
      const user = await User.findOne({ email });
      console.log(user);
      //compare password
      const checkpass = await bcrypt.compare(password, user.password);
      if (checkpass === true) {
        try {
          //generate token
          const token = await sails.helpers.generateToken(email, user.id, "8h");
          //add token in database
          await User.updateOne({ email }, { token: token });
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

  //user logout

  userLogout: async (req, res) => {
    const lang = req.getLocale();

    try {
      const { email } = req.userData;
      console.log(email);
      const users = await User.findOne({ email });
      console.log(users);
      const userUpdate = await User.updateOne({ email }).set({ token: " " });

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
