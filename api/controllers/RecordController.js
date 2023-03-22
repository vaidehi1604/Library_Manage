/**
 * RecordController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const Record = require("../models/Record");

module.exports = {
  addRecord: async (req, res) => {
    const lang = req.getLocale();
    sails.hooks.i18n.setLocale(lang);
    try {
      console.log(1);
      const { user, books } = req.body;
      console.log(req.body);

      const addRecord = await Record.create({
        user,
        books,
      }).fetch();
     

      console.log(addRecord);
      

      if (addRecord) {
        //when user add record issue true
        const updatebook = await Books.updateOne({ id:books }).set({
          issue: true,
        });
        console.log(updatebook);
        return res.status(200).json({
          message: sails.__("addData", lang),
          addRecord:addRecord
        });
      }
      return res.status(201).json({
        message: sails.__("addData", lang),
        addRecord: addRecord,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        error: error + "err",
        message: sails.__("notAdd", lang),
      });
    }
  },
  //record seen by bookId
     maintainRecord:async(req,res)=>{
      const lang=req.getLocale();
      sails.hooks.i18n.setLocale(lang);
      try {
        const book=req.query.books;
        const books=await Record.find({books:book})
        return res.status(200).json({
            message:sails.__("showbooks"),
            books:books
        })
      } catch (error) {
        return res.status(500).json({
            message:sails.__("notshowbooks")
        })
      }
     }
};
