import express from "express";
import dotenv from "dotenv";

import studentRouter from "./routes/student.routes.js";
import courseRouter from "./routes/course.routes.js";
import teacherRouter from "./routes/teacher.routes.js";
import departmentRouter from "./routes/department.routes.js";
import enrollmentRouter from "./routes/enrollment.routes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use("/students", studentRouter);
app.use("/courses", courseRouter);
app.use("/teachers", teacherRouter);
app.use("/departments", departmentRouter);
app.use("/enrollments", enrollmentRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});