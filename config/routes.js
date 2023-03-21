/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {
//admin
"POST /admin/login":"AdminController.adminLogin",
"POST /admin/signup":"AdminController.adminSignup",
"POST /admin/logout":"AdminController.adminLogout",
//user
"POST /user/login":"UserController.userLogin",
"POST /user/signup":"UserController.userSignup",
"POST /user/logout":"UserController.userLogout",
//category
"POST /admin/category":"CategoryController.addCategory"

};
