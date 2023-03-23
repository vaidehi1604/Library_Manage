/**
 * Seed Function
 * (sails.config.bootstrap)
 *
 * A function that runs just before your Sails app gets lifted.
 * > Need more flexibility?  You can also create a hook.
 *
 * For more information on seeding your app with fake data, check out:
 * https://sailsjs.com/config/bootstrap
 */
const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require('uuid');
module.exports.bootstrap = async function () {
  const email ="vaidehi@gmail.com"
  const isAdmin=await Admin.findOne({email:email });
  
  if(isAdmin){
    return console.log(isAdmin);
  }
  else{
  //  creating hash password using hashSync
  const hash = bcrypt.hashSync("1604", 10);
  await Admin.create({
    id:uuidv4(),
    username: "vaidehi",
    email: "vaidehi@gmail.com",
    password: hash,
  });
  }
};
