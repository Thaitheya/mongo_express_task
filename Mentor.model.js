const mongoose = require("mongoose");

const mentorSchema = mongoose.Schema(
  {
    mentorId: {
      type: Number,
      required: true,
      deafult:0
    },
    mentorName: {
      type: String,
      required: [true, "Please enter the student name: "],
    },
    experience: {
      type: Number,
      required: true,
      default: 0,
    },
    batch: {
      type: String,
      required: [true, "Enter the batch properly"],
    },
    studentsUnderMentor: {
        type: [String],
        default: []
    }
  },
  {
    timestamps: true,
  }
);

const mentor = mongoose.model("Mentor", mentorSchema);

module.exports = mentor;
