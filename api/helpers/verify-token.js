const jwt = require("jsonwebtoken");

module.exports = {
  friendlyName: "Verify token",

  description: "",

  inputs: {
    token: {
      type: "string",
      required: true,
    },
  },

  exits: {
    success: {
      description: "Token verify",
    },
    error: {
      description: "Invalid token.",
    },
  },

  fn: async function (inputs, exits) {
    try {
      const { token } = inputs;
      //verify token
      const decode = await jwt.verify(token, process.env.JWT_KEY);
      //find user
      const admin = await Admin.findOne({ email: decode.email });
      const user = await User.findOne({ email: decode.email });

      if (admin) {
        if (token === admin.token) {
          return exits.success(decode);
        } else {
          return exits.error(error);
        }
      } else {
        if (token === user.token) {
          return exits.success(decode);
        } else {
          return exits.error(error);
        }
      }
    } catch (error) {
      return exits.error(error);
    }
  },
};
