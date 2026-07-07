import { Router } from "express";

import {
  createStudent,
  deleteStudent,
  findStudentById,
  getStudents,
  updateStudent,
  uploadStudentCard,
  uploadStudentDocs,
} from "../handlers/student_handler.js";
import { authMiddleware } from "../middlewares/auth_middleware.js";
import { upload } from "../middlewares/upload_middleware.js";
import {
  uploadFileHandler,
  uploadMultipleFilesHandler,
} from "../handlers/upload_handler.js";

let router = Router();

router.get("/", authMiddleware, getStudents);
router.get("/:id", authMiddleware, findStudentById);
router.post("/", authMiddleware, createStudent);
router.put(
  "/upload-student-card/:id",
  authMiddleware,
  upload.single("student-card"),
  uploadStudentCard,
);
router.put(
  "/upload-docs/:id",
  authMiddleware,
  upload.array("docs"),
  uploadStudentDocs,
);
router.put("/:id", authMiddleware, updateStudent);
router.delete("/:id", authMiddleware, deleteStudent);

export default router;
