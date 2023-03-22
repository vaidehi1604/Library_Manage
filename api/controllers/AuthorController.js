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
      //create author data
      const authors = await Author.create({
        author,
        mobileNo,
      });
      console.log(authors);
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
        console.log(updateAuthor);
        return res.status(200).json({
          message: sails.__("dataUpdated", lang),
          updateAuthor:updateAuthor
        });
      } else {
        return res.status(500).json({
          message: sails.__("notUpdated", lang),
        });
      }
    } catch (error) {
      return res.status(500).json({
        message: sails.__("notUpdated", lang),
      });
    }
  },
};
