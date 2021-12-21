// I need these
const express = require("express");
const mongoose = require("mongoose");
require("express-async-errors");
const cors = require("cors");
const app = express();
const path = require("path");

app.use(express.json());
app.use(cors());
app.use("/images", express.static(path.join(__dirname, "./uploads/")));

// my router
const routerAuthTeacher = require("./routes/auth/authTeacher");
const routerAuthStudent = require("./routes/auth/authStudent");
const routerCategoire = require("./routes/categories");
const routerStudentChooseLesson = require("./routes/studentChooseTeacher");
const routerGetStudentOfTeacher = require("./routes/getStudentsOfTeacger");
const routerPostQusetion = require("./routes/postQuestion");
const routerAdmin = require("./routes/auth/authAdmin");
const routerGetStudenAndfTeacherForAdmin = require("./routes/admin/get");
const routerProducts = require("./routes/Products");
const routerCategoiresProducts = require("./routes/categoiresProducts");
const routerLastTeachers = require("./routes/getLast10Teachers");
const routerUpdateTeacher = require("./routes/updateTeacher");
const routerUpdateStudent = require("./routes/updateStudent");
const routerCart = require("./routes/cart");
const routerConversation = require("./routes/conversation");
const routerMessages = require("./routes/message");
const upload = require("./middleware/uploadImage");

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
app.use("/api/update-teacher/", routerUpdateTeacher);
app.use("/api/last-teachers/", routerLastTeachers);

// router student
app.use("/api/student/", routerAuthStudent);
app.use("/api/student/", routerStudentChooseLesson);
app.use("/api/update-student/", routerUpdateStudent);

//router categoires
app.use("/api/categoires/", routerCategoire);
app.use("/api/categoires-products/", routerCategoiresProducts);

//router products
app.use("/api/products", routerProducts);

//router for post question
app.use("/api/question/", routerPostQusetion);

// router caht teacher
app.use("/api/conversations/", routerConversation);
app.use("/api/messages/", routerMessages);

// router admin
app.use("/api/admin/", routerAdmin);
app.use("/api/admin/get/", routerGetStudenAndfTeacherForAdmin);

//router cart
app.use("/api/cart/", routerCart);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`start server at port ${PORT}`);
});
