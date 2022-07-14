const express= require("express");
const router=express.Router();
const session = require("express-session");
const passport = require("passport");

const User =require('./models/userSchema');
const Student=require('./models/student');
const Teacher=require('./models/teacher');


router.get('/dashboard',function(req,res)
{
    User.findById(req.session.id,function(err,founduser){
        if(err)
        console.log(err);
        else
        {
            if(founduser)
            {
                if(founduser.role==="Student")
                {
                    const username=founduser.username;
                    Student.findOne({username:username},function(err,foundStudent){
                        if(err)
                        {
                            console.log(err);
                            res.redirect('/');
                        }
                        else
                        {
                            const studentname=foundStudent.name;
                            res.render("studentDashboard",
                          {
                              name:studentname,starting_letter:studentname[0]
                           });
                        }
                    });
                    
                  }
                else
                {
                    const username=founduser.username;
                    Teacher.findOne({username:username},function(err,foundteacher){
                        if(err)
                        {
                            console.log(err);
                            res.redirect('/');
                        }
                        else
                        {
                            const teachername=foundteacher.name;
                            res.render("teacherDashboard",
                          {
                              name:teachername,starting_letter:teachername[0]
                           });
                        }
                    });
                    
                   
                }
                
            }
        }
})
});