/**
 * RecordController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

// const Record = require("../models/Record");

module.exports = {
  addRecord: async (req, res) => {
    const userId = req.userData.id;
    const lang = req.getLocale();
    sails.hooks.i18n.setLocale(lang);
    try {
      const { user, books } = req.body;

      const id = await sails.helpers.id();

      const addRecord = await Record.create({
        id,
        user:userId,
        books,
      }).fetch();

      const book = await Books.findOne({ id: books });
      if (addRecord) {
        const updatebook = await Books.updateOne({ id: books }).set({
          issue: true,
        });
        return res.status(201).json({
          message: sails.__("addData", lang),
          addRecord: addRecord,
        });
      } else {
        return res.status(500).json({
          error: error + "err",
          message: sails.__("notAdd", lang),
        });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        error: error + "err",
        message: sails.__("notAdd", lang),
      });
    }
  },
  // record seen by bookId
  maintainRecord: async (req, res) => {
    const lang = req.getLocale();
    sails.hooks.i18n.setLocale(lang);
    try {
      const { id } = req.params;
      const record = await Record.findOne({ id });
      const recordUpdate = await Record.updateOne({ id: id }).set({
        returnBook: true,
      });
    
      if (recordUpdate) {
        const updatebook = await Books.updateOne({ id: record.books }).set({
          issue: false,
        });
        
      } else {
        return res.status(500).json({
          message: sails.__("notshowbooks"),
        });
      }
      return res.status(200).json({
        message: sails.__("showbooks"),
        recordUpdate: recordUpdate,
      });
    } catch (error) {
      return res.status(500).json({
        message: sails.__("notshowbooks"),
      });
    }
  },
  //get book record by bookId
  getBooks: async (req, res) => {
    const lang = req.getLocale();
    sails.hooks.i18n.setLocale(lang);
    try {
      //find record

      const records = await Record.find({ books: req.query.books });
      // console.log(records);
      return res.status(200).json({
        message: sails.__("showbooks"),
        records: records,
      });
    } catch (error) {
      return res.status(500).json({
        message: sails.__("notshowbooks"),
      });
    }
  },
};
