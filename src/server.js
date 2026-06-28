import express from "express";
import dotenv from "dotenv";

import studentRouter from "./routes/student.routes.js";
import courseRouter from "./routes/course.routes.js";
import teacherRouter from "./routes/teacher.routes.js";
import departmentRouter from "./routes/department.routes.js";
import enrollmentRouter from "./routes/enrollment.routes.js";
import {
  attachRequestTimestamp,
  checkApiKeyMiddleware,
} from "./middlewares/global_middleware.js";
import { customErrorMiddleware } from "./middlewares/error_middleware.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// logger middleware
app.use((req, res, next) => {
  let timeStamp = new Date().toISOString();
  let url = req.url;
  let method = req.method;
  console.log(`Timestamp: ${timeStamp} \t Url: ${url} \t Method: ${method}`);

  if (url == "/apikey") {
    return res.status(400).json({
      message: "Invalid route",
      data: url,
    });
  }

  // forwarding to further task
  next();
});

// x-api-key-header middleware
// app.use(checkApiKeyMiddleware);

// using middleware for request timeStamp
app.use(attachRequestTimestamp);
app.get("/request-time", (req, res) => {
  res.status(200).json({
    message: "Attached request timeStamp to request",
    data: req.requestTimestamp,
  });
});

app.get("/protected", checkApiKeyMiddleware, (req, res) => {
  res.status(200).json({
    message: "Protected route called",
  });
});

app.use("/error-test", (req, res, next) => {
  try {
    throw new Error("Something went wrong on error-test");
  } catch (e) {
    next(e);
  }
});

app.use("/students", studentRouter);
app.use("/courses", courseRouter);
app.use("/teachers", teacherRouter);
app.use("/departments", departmentRouter);
app.use("/enrollments", enrollmentRouter);


// response middleware to modify the error should be at last of all routes
app.use(customErrorMiddleware);


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
