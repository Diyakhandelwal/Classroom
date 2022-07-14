const mongoose = require("mongoose");

const { Schema } = mongoose;

const assignmentSchema = new Schema({
  teacher_id: String,
  assignment_no : Number,
  subject:String,
  upload_file:
});

module.exports = new mongoose.model("Assignment", assignmentSchema);