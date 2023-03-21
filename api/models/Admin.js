/**
 * Admin.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports= {

  attributes: {

    username: {
      type: 'string',
      required: true,
    },
    email: {
      type: 'string',
      required: true,
      isEmail: true,
      unique: true,
    },

    password: {
      type: 'string',
      required: true,
    },
    token:{
      type: 'string',
    }
  },

  };



