/**
 * Category.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  attributes: {
    category: {
      type: "string",
      required: true,
    },
    books:{
      collection:'books',
      via:'category'
    }
  },
};
