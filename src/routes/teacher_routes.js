import { Router } from "express";

import {
  createTeacher,
  findTeacherById,
  getAllTeachers,
  updateTeacher,
  deleteTeacher,
  createTeacherWithDepartment,
  getAllTeachersWithSelect,
  sortTeachers,
  filterTeachers,
} from "../handlers/teacher_handler.js";
import { authMiddleware } from "../middlewares/auth_middleware.js";

let router = Router();

router.get("/", authMiddleware, getAllTeachers);
router.get("/select", authMiddleware, getAllTeachersWithSelect);
router.get("/sort", authMiddleware, sortTeachers);
router.get("/filter", authMiddleware, filterTeachers);
router.get("/:id", authMiddleware, findTeacherById);
router.post("/", authMiddleware, createTeacher);
router.post("/with-depart", authMiddleware, createTeacherWithDepartment);
router.put("/:id", authMiddleware, updateTeacher);
router.delete("/:id", authMiddleware, deleteTeacher);

export default router;
