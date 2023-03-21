/**
 * CategoryController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */



module.exports = {
  
addCategory:async(req,res)=>{
    const lang = req.getLocale();
    try {
        const {category}=req.body
        //create category
        const categorys=await Category.create({
            category
        }).fetch()
        return res.status(201).json({
            message:sails.__("dataStore",lang),
            categorys:categorys
        })
    } catch (error) {
        return res.status(500).json({
            message:sails.__("notStore",lang),
        })
    }
}
};

