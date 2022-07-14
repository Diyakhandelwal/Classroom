const mongoose = require("mongoose");

const { Schema } = mongoose;

const teacherSchema= new mongoose.Schema({
    
    password: { type: String, required: true },
    user_name: { type: String, required: true },
   
        Department: { type: String },
       
});
module.exports = teacherSchema;