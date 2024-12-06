const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

const Student = require("./studentModel");

const app = express();
app.use(cors());
app.use(bodyParser.json());

console.log("ENV ->>> ", process.env.MONGODB_URI)

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Routes
app.get("/students", async (req, res) => {
  const students = await Student.find();
  res.json(students);
});

app.post("/students", async (req, res) => {
  const student = new Student(req.body);
  await student.save();
  res.json({ message: "Student added!" });
});

app.put("/students/:id", async (req, res) => {
  const { id } = req.params;
  await Student.findByIdAndUpdate(id, req.body);
  res.json({ message: "Student updated!" });
});

app.delete("/students/:id", async (req, res) => {
  const { id } = req.params;
  await Student.findByIdAndDelete(id);
  res.json({ message: "Student deleted!" });
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
