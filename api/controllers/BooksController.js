/**
 * BooksController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  addBooks: async (req, res) => {
    const lang = req.getLocale();
    try {
      const { bookName, category, author, price, publishYear } = req.body;
      const addbook = await Books.create({
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
getBooks:async(req,res)=>{
    const lang=req.getLocale();

    try {
        const limit = req.query.limit || 2;
        const skip = req.query.skip || 0;
        //get books with pagination
        const getbooks = await Books.find({ limit: limit, skip: skip });
  
        return res.status(200).json({
          message: sails.__("getData", lang),
          getbooks: getbooks,
        });
      } catch (error) {
        return res.status(500).json({
          error:error,
          message: sails.__("notGet", lang),
        });
      }
},
  updateBooks: async (req, res) => {
    const lang = req.getLocale();
    try {
      const { id } = req.params;
      const { bookName, category, author, price, publishYear,issue } = req.body;
      const books = await Books.find(id);
      if (books) {
        const updateBooks = await Books.updateOne({ id: id }).set({
          bookName,
          category,
          author,
          price,
          publishYear,
          issue
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
      const books = await Books.find(id);
      if (books) {
        const deleteBooks = await Books.destroyOne({ id: id });
        return res.status(200).json({
          message: sails.__("deleteData", lang),
          deleteBooks:deleteBooks
        });
      }
    } catch (error) {
      return res.status(500).json({
        error: error,
        message: sails.__("notDeleted", lang),
      });
    }
  },
};
