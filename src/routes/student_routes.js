import { Router } from "express";

import {
  createStudent,
  deleteStudent,
  findStudentById,
  getStudents,
  updateStudent,
} from "../handlers/student_handler.js";
import { authMiddleware } from "../middlewares/auth_middleware.js";

let router = Router();

router.get("/", authMiddleware, getStudents);
router.get("/:id", authMiddleware, findStudentById);
router.post("/", authMiddleware, createStudent);
router.put("/:id", authMiddleware, updateStudent);
router.delete("/:id", authMiddleware, deleteStudent);

export default router;
