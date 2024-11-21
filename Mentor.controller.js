const express = require("express");
const Mentor = require("../model/Mentor.model");
const app = express();

app.use(express.json());

app.get("/mentors", async (req, res) => {
  try {
    const mentors = await Mentor.find({});
    res.status(200).json(mentors);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching mentors", error: error.message });
  }
});
//create mentor
app.post("/mentor", async (req, res) => {
  try {
    const newMentor = await Mentor.create(req.body); 
    res.status(201).json(newMentor);
  } catch (error) {
    console.error("Error creating mentor:", error);
    res
      .status(400)
      .json({ message: "Unable to create mentor", error: error.message });
  }
});

//Assign a student to a mentor
app.post("/assign-student", async (req, res) => {
  const { mentorId, studentName } = req.body;

  try {
    // Find the mentor by ID
    const mentor = await Mentor.findById(mentorId);

    if (!mentor) {
      return res.status(404).json({ message: "Mentor not found" });
    }

    // Add the student to the studentsUnderMentor array
    if (!mentor.studentsUnderMentor.includes(studentName)) {
      mentor.studentsUnderMentor.push(studentName);
    } else {
      return res
        .status(400)
        .json({ message: "Student is already assigned to this mentor" });
    }

    // Save the updated mentor document
    await mentor.save();

    res.status(200).json({ message: "Student assigned successfully", mentor });
  } catch (error) {
    console.error("Error assigning student to mentor:", error);
    res
      .status(500)
      .json({ message: "Unable to assign student", error: error.message });
  }
});


app.get("/mentor/:mentorName/students", async (req, res) => {
  const { mentorName } = req.params; // The mentor's name is provided in the URL

  try {
    // Find the mentor by mentorName
    const mentor = await Mentor.findOne({ mentorName: mentorName });

    if (!mentor) {
      return res.status(404).json({ message: "Mentor not found." });
    }

    // Retrieve the list of students under the mentor
    const students = mentor.studentsUnderMentor;

    if (!students || students.length === 0) {
      return res
        .status(200)
        .json({ message: `No students found for ${mentorName}.` });
    }

    res.status(200).json({
      mentorName: mentorName,
      students: students,
    });
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Error fetching students under mentor",
        error: error.message,
      });
  }
});

module.exports = app;
