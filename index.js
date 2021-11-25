// I need these
const express = require("express");
const mongoose = require("mongoose");
require("express-async-errors");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(cors());
app.use("/uploads", express.static("uploads"));

// my router
const routerAuthTeacher = require("./routes/authTeacher");
const routerAuthStudent = require("./routes/authStudent");
const routerCategoire = require("./routes/categories");
const routerStudentChooseLesson = require("./routes/studentChooseTeacher");
const routerGetStudentOfTeacher = require("./routes/getStudentsOfTeacger");
const routerPostQusetion = require("./routes/postQuestion");

// connect to db
mongoose
  .connect(
    "mongodb+srv://programmer:school1234@school.c4aiz.mongodb.net/schoolDB?retryWrites=true&w=majority"
  )
  .then(() => console.log("Successfull connect DB"))
  .catch((error) => console.log("Faild connect DB " + error));

//  router teacher
app.use("/api/teacher/", routerAuthTeacher);
app.use("/api/teacher/", routerGetStudentOfTeacher);

// router student
app.use("/api/student/", routerAuthStudent);
app.use("/api/student/", routerStudentChooseLesson);

//router categoires
app.use("/api/categoires/", routerCategoire);

//router for post question
app.use("/api/question/", routerPostQusetion);

//
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`start server at port ${port}`);
});
