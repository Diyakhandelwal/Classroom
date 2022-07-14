const mongoose = require("mongoose");

const { Schema } = mongoose;

const studentSchema = new mongoose. Schema({
  username: { type: String, required: true },
  role :{type: String},
  name: { type: String, required: true },
  class_id: { type: String, required: true, ref: "Class" },
  sem:{type:String,}
  //result: [{ type: mongoose.Types.ObjectId, required: true, ref: "Result" }],
});


module.exports =  studentSchema;