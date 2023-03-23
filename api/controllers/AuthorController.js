/**
 * AuthorController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  addAuthor: async (req, res) => {
    const lang = req.getLocale();
    try {
      //store data
      const { author, mobileNo } = req.body;
      //create uuid 
      const id = await sails.helpers.id();
      //create author data
      const authors = await Author.create({
        id,
        author,
        mobileNo,
      }).fetch();
      return res.status(201).json({
        message: sails.__("addDatta", lang),
        authors: authors,
      });
    } catch (error) {
      return res.status(500).json({
        error: error,
        message: sails.__("notAdd", lang),
      });
    }
  },
  updateAuthor: async (req, res) => {
    const lang = req.getLocale();
    try {
      const { id } = req.params;
      const { author, mobileNo } = req.body;
      //find author
      const authors = await Author.find(id);
      //checke author find or not
      if (authors) {
        //update author
        const updateAuthor = await Author.updateOne({ id: id }).set({
          author: author,
          mobileNo: mobileNo,
        });
        
        return res.status(200).json({
          message: sails.__("dataUpdated", lang),
          updateAuthor: updateAuthor,
        });
      } else {
        return res.status(500).json({
          message: sails.__("notUpdated", lang),
        });
      }
    } catch (error) {
      return res.status(500).json({
        error:error,
        message: sails.__("notUpdated", lang),
      });
    }
  },
  //delete author data
  deleteAuthor: async (req, res) => {
    const lang = req.getLocale();
    try {
      const { id } = req.params;
      const author = await Author.find({ id });
      if (author) {
        //delete author
        const deleteAuthor = await Author.destroyOne({ id: id });
        console.log(deleteAuthor);
        return res.status(200).json({
          message: sails.__("deleteData", lang),
        });
      } else {
        //data not deleted or category not found
        return res.status(404).json({
          message: sails.__("notDeleted", lang),
        });
      }
    } catch (error) {
      return res.status(200).json({
        error:error,
        message: sails.__("notDeleted", lang),
      });
    }
  },
  getAuthor:async(req,res)=>{
    const lang=req.getLocale();
    try {
        const limit = req.query.limit || 2;
        const skip = req.query.skip || 0;
        //get author with pagination
        const getAuthor = await Author.find({ limit: limit, skip: skip });
  
        return res.status(200).json({
          message: sails.__("getData", lang),
          getAuthor: getAuthor,
        });
    } catch (error) {
        return res.status(500).json({
            error:error,
            message: sails.__("notGet", lang),
          });
    }
  }
};
