/*const express = require("express");
const expressSession = require("express-session");
const passport = require("passport");
const router=express.Router();
//const User = require("./models/userSchema");

router.get("/account",function(req,res)
{
   User.findById(req.user._id,function(err,foundUser){
      if(err)
      {
        console.log(err);
      }
      else{
        res.render("MyAccount",{user:foundUser.name});
      }
   });
});
router.post("/account",function(req,res){
    User.findById(req.user._id, (err, foundObject) => {
         if(req.body.firstName.length !== 0) {
            foundObject.firstName = req.body.firstName;
            foundObject.name = req.body.firstName+foundObject.lastName;
          }
          if(req.body.lastName.length !== 0) {
            foundObject.lastName = req.body.lastName;
            foundObject.name = req.body.lastName+foundObject.firstName;
          }
          if(req.body.password.length !== 0 && req.body.confirpassword.length!=0) {
            foundObject.password = req.body.password;
          }
          foundObject.save();
          console.log(foundObject);
        });
});
module.exports = router;
*/