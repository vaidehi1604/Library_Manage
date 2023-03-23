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
  //Admin
  "POST /admin/login": "AdminController.adminLogin",
  "POST /admin/logout": "AdminController.adminLogout",

  //User
  "POST /user/login": "UserController.userLogin",
  "POST /user/signup": "UserController.userSignup",
  "POST /user/logout": "UserController.userLogout",

  //Category
  "POST /admin/category": "CategoryController.addCategory",
  "GET /admin/category": "CategoryController.getCategory",
  "PATCH /admin/category/:id": "CategoryController.updateCategory",
  "DELETE /admin/category/:id": "CategoryController.deleteCategory",

  //Author
  "POST /admin/author": "AuthorController.addAuthor",
  "PATCH /admin/author/:id": "AuthorController.updateAuthor",
  "DELETE /admin/author/:id": "AuthorController.deleteAuthor",
  "GET /admin/author": "AuthorController.getAuthor",

  //Books
  "POST /admin/books": "BooksController.addBooks",
  "GET /admin/book": "BooksController.getBooks",
  "PATCH /admin/books/:id": "BooksController.updateBooks",
  "DELETE /admin/books/:id": "BooksController.deleteBooks",
  "GET /admin/books": "BooksController.getBookIssue",
  "GET /book/search": "BooksController.searchAll",
  "GET /book/category":"BooksController.getByCategory",


  //Record
  "POST /user/record": "RecordController.addRecord",
  "PATCH /user/record/:id": "RecordController.maintainRecord",
  "Get /user/record": "RecordController.getBooks",

// getBooks
  // maintainRecord
};
