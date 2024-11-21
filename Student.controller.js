const express = require("express")
const Student = require('../model/Student.model')
const Mentor = require('../model/Mentor.model')
const app = express()
app.use(express.json())

//create student
app.post('/student', async(req, res)=> {
    try {
        const student = await Student.create(req.body)
        res.status(201).json(student)
    } catch (error) {
        res.status(400).json({message: "Unable to create user"})
    }
})
//Student has no mentor
app.get("/nomentor", async (req, res) => {
  try {
    const mentors = await Mentor.find();
    const allMentoredStudents = mentors.flatMap(
      (mentor) => mentor.studentsUnderMentor
    );    
    const allStudents = await Student.find(); 
    const studentsWithoutMentor = allStudents.filter(
      (student) => !allMentoredStudents.includes(student.name)
    );
    res.status(200).json(studentsWithoutMentor);
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Error fetching students without mentor",
        error: error.message,
      });
  }
});

//Select one student and assign one mentor
app.put("/update/:id", async (req, res) => {
  const { studentName, mentorName } = req.body; // Expecting studentName and mentorName in the request body

  try {
    // Find the mentor by mentorName
    const mentor = await Mentor.findOne({ mentorName: mentorName });

    if (!mentor) {
      return res.status(404).json({ message: "Mentor not found." });
    }
    if (mentor.studentsUnderMentor.includes(studentName)) {
      return res
        .status(400)
        .json({ message: "Student is already assigned to this mentor." });
    }
    mentor.studentsUnderMentor.push(studentName);
    await mentor.save();
    res.status(200).json({
      message: `${studentName} has been successfully assigned to ${mentorName}.`,
      mentor: mentor,
    });
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Error assigning student to mentor",
        error: error.message,
      });
  }
});


app.get("/student/:studentName/mentor", async (req, res) => {
  const { studentName } = req.params;

  try {
    const student = await Student.findOne({ name: studentName });

    if (!student) {
      return res.status(404).json({ message: "Student not found." });
    }
    const mentorAssigned = student.mentorAssigned;

    if (!mentorAssigned) {
      return res
        .status(200)
        .json({ message: `No mentor assigned to ${studentName}.` });
    }

    res.status(200).json({
      studentName: studentName,
      mentorAssigned: mentorAssigned,
    });
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Error fetching mentor for student",
        error: error.message,
      });
  }
});

module.exports = app;