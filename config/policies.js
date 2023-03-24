/**
 * Policy Mappings
 * (sails.config.policies)
 *
 * Policies are simple functions which run **before** your actions.
 *
 * For more information on configuring policies, check out:
 * https://sailsjs.com/docs/concepts/policies
 */

const RecordController = require("../api/controllers/RecordController");

module.exports.policies = {

  /***************************************************************************
  *                                                                          *
  * Default policy for all controllers and actions, unless overridden.       *
  * (`true` allows public access)                                            *
  *                                                                          *
  ***************************************************************************/

  // '*': true,
  UserController: {
    "userLogout": "userLoggedIn",
    // "*": true,
  },
  AdminController: {
    "adminLogout": "isAdmin",
    // "*": true,
  },
  CategoryController:{
    "*":"isAdmin"
  },
  AuthorController:{
    "*":"isAdmin"
  },
  BooksController:{
    "*":"isAdmin",
    "getBooks":"userLoggedIn",
    "getBookIssue":"userLoggedIn",
    "searchAll":"userLoggedIn",
    "getByCategory":"userLoggedIn",

  }
  ,
  RecordController:{
    "*":"userLoggedIn",
    "maintainRecord":"isAdmin"

  }
};
