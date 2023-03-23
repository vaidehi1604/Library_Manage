const { v4: uuidv4 } = require('uuid');
module.exports = {


  friendlyName: 'Id',


  description: 'Id something.',


  inputs: {

  },


  exits: {

    success: {
      description: 'All done.',
    },

  },


  fn: async function (inputs) {
     return uuidv4()
  }


};

