import { Router } from "express";

import {
  findEnrollmentById,
  getAllEnrollments,
  enrollStudentInCourse,
} from "../handlers/enrollment_handler.js";
import { authMiddleware } from "../middlewares/auth_middleware.js";

let router = Router();

router.get("/", authMiddleware, getAllEnrollments);
router.get("/:id", authMiddleware, findEnrollmentById);
router.post("/", authMiddleware, enrollStudentInCourse);

export default router;
