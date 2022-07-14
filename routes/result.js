/*const express= require("express");
const router=express.Router();
const session = require("express-session");
const passport = require("passport");
const User =require('./models/userSchema');

router.get('/result',function(req,res)
{
    User.findById(req.user.id,function(err,founduser)
    {
        if(err)
        console.log(err);
        else
        {
            res.render("studentResult",{student:founduser});
        }
    })
    console.log("hey");
})


//router.post('/studentResult',function(req,res)
//{
    
//});

module.exports=router;
*/
