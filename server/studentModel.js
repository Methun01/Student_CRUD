const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  rollNo: Number,
  name: String,
  class: String,
  phone: String,
});

module.exports = mongoose.model("Student", studentSchema, "sample_form");
