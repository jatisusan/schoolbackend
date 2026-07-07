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

router.get("/", getAllTeachers);
router.get("/select", getAllTeachersWithSelect);
router.get("/sort", sortTeachers);
router.get("/filter", filterTeachers);
router.get("/:id", findTeacherById);
router.post("/", authMiddleware, createTeacher);
router.post("/with-depart", authMiddleware, createTeacherWithDepartment);
router.put("/:id", authMiddleware, updateTeacher);
router.delete("/:id", authMiddleware, deleteTeacher);

export default router;
