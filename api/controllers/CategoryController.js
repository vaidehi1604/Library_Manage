/**
 * CategoryController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  //add category
  addCategory: async (req, res) => {
    const lang = req.getLocale();
    try {
      const { category } = req.body;
      //create category
      const categorys = await Category.create({
        category,
      }).fetch();
      //category added response
      return res.status(201).json({
        message: sails.__("dataStore", lang),
        categorys: categorys,
      });
    } catch (error) {
      //category not added response
      return res.status(500).json({
        error:error,
        message: sails.__("notStore", lang),
      });
    }
  },

  //get all category

  getCategory: async (req, res) => {
    const lang = req.getLocale();
    try {
      const limit = req.query.limit || 2;
      const skip = req.query.skip || 0;
      //get category with pagination
      const getcategory = await Category.find({ limit: limit, skip: skip });

      return res.status(200).json({
        message: sails.__("getData", lang),
        getcategory: getcategory,
      });
    } catch (error) {
      return res.status(500).json({
        error:error,
        message: sails.__("notGet", lang),
      });
    }
  },

  //update category
  updateCategory: async (req, res) => {
    const lang = req.getLocale();
    try {
      const { id } = req.params;
      //find category
      const categorys = await Category.find(id);
      //checke category found or not
      if (categorys) {
        //update category
        const updateCategory = await Category.updateOne({ id: id }).set({
          category: req.body.category,
        });
        //category updated response
        return res.status(200).json({
          message: sails.__("dataUpdated", lang),
          updateCategory: updateCategory,
        });
      }
    } catch (error) {
      //category not updated response
      return res.status(500).json({
        error:error,
        message: sails.__("notUpdated", lang),
      });
    }
  },

  deleteCategory: async (req, res) => {
    const lang = req.getLocale();
    try {
      //get id to update category
      const { id } = req.params;
      //find category
      const category = await Category.find({ id });
      //check category found or not
      if (category) {
        //category deleted
        const deleteCategory = await Category.destroyOne({ id: id });
        console.log(deleteCategory);
        //data deleted response
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
      //data not deleted
      return res.status(500).json({
        error:error,
        message: sails.__("notDeleted", lang),
      });
    }
  },
};
