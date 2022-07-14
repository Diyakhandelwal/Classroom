require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const path = require("path");
const passport = require("passport");
const session = require("express-session");
const mongoose = require("mongoose");
//const User = require("./models/userSchema");
const studentschema= require('./models/student');
const teacherschema= require('./models/teacher');
const passportLocalMongoose = require("passport-local-mongoose");
const findOrCreate = require('mongoose-findorcreate');
const app = express();
//const resultRoutes = require("./routes/result");
//const accountRoutes = require("./routes/account");

/*const loginRoutes = require("./routes/login");
const studentClassRoutes = require("./routes/classes");
const teacherClassRoutes = require("./routes/teacherClass");
const studentAssignRoutes = require("./routes/assignment");
const teacherAssignRoutes = require("./routes/teacherAssign");


const dashboardRoutes = require("./routes/dashboard");

const excelRoutes = require("./routes/excelUpload");
*/

app.listen(5000,function(){
  console.log("Server is started at port 3000");
});

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('public'));

const userSchema = new  mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String},
  role:{type: String},
  profiles:studentschema,
  profilet: teacherschema
});

app.set("view engine", "ejs");

app.use(
  session({
    secret: "heyim",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

mongoose.connect("mongodb://localhost:27017/project", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

userSchema.plugin(passportLocalMongoose);
userSchema.plugin(findOrCreate);

const User = new mongoose.model("user", userSchema);
passport.use(User.createStrategy());


passport.serializeUser(function(user, done) {
  done(null, user.id);
});
passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});










const Stud = new mongoose.model("stud",studentschema);
const fun=({
  username:"diya",
  //password:"1234",
  role:"student",
  name:"diya",
  class_id:"1",
  sem:7
})
Stud.create(fun);
const Tud = new mongoose.model("tud",teacherschema);


const newUser = new User({
  username: "diya",
 
  role:"student",
  profiles:fun
})
User.register(newUser,"123456", function(err,user){
  if(err)
  {console.log(err);}
  else
    //A new user was saved
    
   // passport.authenticate("local")(req,res,function(){
      console.log("success");
    
  
})






app.get('/',function(req,res)
{
    res.render("login");
})
app.post("/", function(req, res) {
  const user = new User({
    username: req.body.username,
    password: req.body.password,
  });
  User.exists({username: req.body.username}, function (err, doc) {
    if (err){
        console.log(err)
    }else{
        if(!doc){
          //USER DOES NOT EXIST
          res.send({message:"USER NOT FOUND", role:"", userInfo:{}});
        }
        else{
          //REST ALL HAPPENS HERE
          req.login(user, function(err){
            if(err){
              console.log(err);
               
            }
            else{
              passport.authenticate("local")(req, res, function(){                  
                
                //after authentication, send userInfo as a response (if its not admin)
                if(req.body.role==="Student"){
                  Stud.exists({username: req.body.username}, function(errorr, studDoc){
                    if(errorr)console.log(errorr);
                    else{
                      if(studDoc){
                        //=> such student exists
                        Stud.find({ username: req.body.username}, function (err, docs) {
                          if(err){
                            console.log(err);
                          }
                          else{
                            //console.log(docs);
                            //console.log(req.user);
                            //serverGlobalData.user = docs[0];
                            //serverGlobalData.role = "Student";
                            //serverGlobalData.loggedInStatus = "LOGGED-IN";
                            //console.log(req.isAuthenticated());///////////////////////////////////////////////////////////////
                            console.log(req.body.role+ " logged in.");
                            //res.send({message: "LOGGED-IN", role:"Student", userInfo: docs[0]});
                            //const letter= docs.name;
                            
                            res.render("studentDashboard",{student:req.body.username});
                          }
                        });
                      }else{
                        //res.send({message:"LOGIN FAILED: ROLE MISMATCH"});
                        console.log("role mismatch");
                      }
                    }
                  });
                }
                else if(req.body.role==="Teacher"){
                  Tud.exists({username: req.body.username}, function(errorr, teacherDoc){
                    if(errorr)console.log(errorr);
                    else{
                      if(teacherDoc){
                        Tud.find({ username: req.body.username}, function (err, docs) {
                          if(err){
                            console.log(err);
                          }
                          else{
                            //console.log(docs);
                            //serverGlobalData.user = docs[0];
                            //serverGlobalData.role = "Teacher";
                            //serverGlobalData.loggedInStatus = "LOGGED-IN";
                            console.log(req.body.role+ " logged in.");
                            //res.send({message: "LOGGED-IN", role:"Teacher", userInfo: docs[0]});
                          }
                        });
                      }else{
                        console.log("role mismatch");
                      }
                    }
                  })
                }
              });
            }
          });

        }
    }
});
  

});

/*app.post("/", function(req, res) {
  const user = new User({
    username: req.body.username,
    password: req.body.password,
  });
  req.login(user, function(err) {
    if (err) {
      console.log(err);
    } else {
      id = user._id;
      console.log(id);
      passport.authenticate("local")(req, res, function() {
        if(user.role === "student") 
        res.render("studentDashboard",{student:user.profiles.name});
        else {
          console.log("teacher");
          res.render("login");
        }
      });
    }
  });
});
*/



app.get('/result',function(req,res)
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
});


app.get('/account',function(req,res)
{
   User.findById(req.user.id,function(err,foundUser){
      if(err)
      {
        console.log(err);
      }
      else{
        res.render("MyAccount",{user:foundUser});
      }
   });
});

app.post("/account",function(req,res){
    User.findById(req.user.id, (err, foundObject) => {
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
        res.redirect('/');
});


//app.use("/dashboard", dashboardRoutes);

//app.use(accountRoutes);




    
  

  