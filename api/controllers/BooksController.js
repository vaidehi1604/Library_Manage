/**
 * BooksController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  //add  books
  addBooks: async (req, res) => {
    const lang = req.getLocale();
    try {
      const { bookName, category, author, price, publishYear } = req.body;
      //create id with uuid
      const id = await sails.helpers.id();
      //create book
      const addbook = await Books.create({
        id,
        bookName,
        category,
        author,
        price,
        publishYear,
      }).fetch();
      console.log(addbook);
      return res.status(201).json({
        message: sails.__("addData", lang),
        addbook: addbook,
      });
    } catch (error) {
      return res.status(500).json({
        error: error,
        message: sails.__("notAdd", lang),
      });
    }
  },
  //get all books with pagination
  getBooks: async (req, res) => {
    const lang = req.getLocale();

    try {
      const limit = req.query.limit || 2;
      const skip = req.query.skip || 0;
      //get books with pagination
      const getbooks = await Books.find({ limit: limit, skip: skip });
      console.log(getbooks);
      return res.status(200).json({
        message: sails.__("getData", lang),
        getbooks: getbooks,
      });
    } catch (error) {
      return res.status(500).json({
        error: error,
        message: sails.__("notGet", lang),
      });
    }
  },
  updateBooks: async (req, res) => {
    const lang = req.getLocale();
    try {
      const { id } = req.params;
      const { bookName, category, author, price, publishYear, issue } =
        req.body;
      const books = await Books.find(id);
      if (books) {
        const updateBooks = await Books.updateOne({ id: id }).set({
          bookName,
          category,
          author,
          price,
          publishYear,
          issue,
        });
        console.log(updateBooks);
        return res.status(200).json({
          message: sails.__("dataUpdated", lang),
          updateBooks: updateBooks,
        });
      }
    } catch (error) {
      return res.status(500).json({
        message: sails.__("notUpdated", lang),
      });
    }
  },

  deleteBooks: async (req, res) => {
    const lang = req.getLocale();
    try {
      const { id } = req.params;
      //find book
      const books = await Books.find(id);
      //check book found or not
      if (books) {
        //delete book
        const deleteBooks = await Books.destroyOne({ id: id });
        return res.status(200).json({
          message: sails.__("deleteData", lang),
          deleteBooks: deleteBooks,
        });
      }
    } catch (error) {
      return res.status(500).json({
        error: error,
        message: sails.__("notDeleted", lang),
      });
    }
  },
  //get book issue false
  getBookIssue: async (req, res) => {
    const lang = req.getLocale();

    try {
      //find book and show issue false book
      const getbooks = await Books.find({ issue: false });

      return res.status(200).json({
        message: sails.__("getData", lang),
        getbooks: getbooks,
      });
    } catch (error) {
      return res.status(500).json({
        error: error,
        message: sails.__("notGet", lang),
      });
    }
  },

  searchAll: async (req, res) => {
    const lang = req.getLocale();
    try {
      const bookName = req.query.name || "";

      console.log(bookName);
      const book = await Books.find({
        where: { bookName: { contains: bookName } },
      }).populate("author");

      if (!book) {
        return res.status(404).json({
          message: sails.__("datanot", lang),
        });
      }
      return res.status(200).json({
        message: sails.__("getData", lang),
        books: book,
      });
    } catch (error) {
      return res.status(500).json({
        error: error,
        message: sails.__("notGet", lang),
      });
    }
  },
  //get by author
  getByAuthor: async (req, res) => {
    const lang = req.getLocale();
    try {
      const author = req.query.author || "";
      const authors = await Author.find({
        where: { author: { contains: author } },
      }).populate("books");
      console.log(authors);
      return res.status(200).json({
        message: sails.__("getData", lang),
        authors: authors,
      });
    } catch (error) {
      return res.status(500).json({
        error: error,
        message: sails.__("notGet", lang),
      });
    }
  },
  getByCategory: async (req, res) => {
    const lang = req.getLocale();
    try {
      const category = req.query.cat;
      const book = await Books.find({ where: { category: category } });
      if (!book) {
        return res.status(404).json({
          message: sails.__("datanot", lang),
        });
      }
      return res.status(200).json({
        message: sails.__("getData", lang),
        book: book,
      });
    } catch (error) {
      return res.status(500).json({
        error: error,
        message: sails.__("notGet", lang),
      });
    }
  },
};
