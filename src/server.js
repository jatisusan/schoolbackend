import express from "express";
import dotenv from "dotenv";
import path from "path";

import studentRouter from "./routes/student_routes.js";
import courseRouter from "./routes/course_routes.js";
import teacherRouter from "./routes/teacher_routes.js";
import departmentRouter from "./routes/department_routes.js";
import enrollmentRouter from "./routes/enrollment_routes.js";
import authRouter from "./routes/auth_routes.js";

import { loggerMiddleware } from "./middlewares/logger_middleware.js";
import { customErrorMiddleware } from "./middlewares/error_middleware.js";
import { upload } from "./middlewares/upload_middleware.js";
import { uploadFileHandler } from "./handlers/upload_handler.js";
import { fileURLToPath } from "url";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(loggerMiddleware);

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);
app.use("/uploads", express.static(path.join(dirname, "uploads")));

app.post("/upload", upload.single("profile"), uploadFileHandler);

app.use("/students", studentRouter);
app.use("/courses", courseRouter);
app.use("/teachers", teacherRouter);
app.use("/departments", departmentRouter);
app.use("/enrollments", enrollmentRouter);
app.use("/auth", authRouter);

app.use(customErrorMiddleware);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
