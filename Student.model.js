const mongoose = require('mongoose')

const studentSchema = mongoose.Schema(
  {
    name: {type: String,required: [true, "Please enter the student name: "],},
    age: {type: Number,required: true,default: 0,},
    batch: {type: String,required: [true, "Enter the batch properly"],},
    mentorAssigned: { type: String, default: null },
  },
  {timestamps: true,}
);

const student = mongoose.model('student', studentSchema)

module.exports = student