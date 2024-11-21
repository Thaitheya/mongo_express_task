const express = require('express')
const mongoose = require('mongoose')
const connectDB = require('./database/db')
const student = require('./controller/Student.controller')
const mentor = require('./controller/Mentor.controller')
const app = express();

app.use('/',student)
app.use('/', mentor)
const startServer = async () => {
  await connectDB();
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

startServer();


