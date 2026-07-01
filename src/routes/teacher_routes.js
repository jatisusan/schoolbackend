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
import { Router } from "express";

let router = Router();

router.get("/", getAllTeachers);
router.get("/select", getAllTeachersWithSelect);
router.get("/sort", sortTeachers);
router.get("/filter", filterTeachers);
router.get("/:id", findTeacherById);
router.post("/", createTeacher);
router.post("/with-depart", createTeacherWithDepartment);
router.put("/:id", updateTeacher);
router.delete("/:id", deleteTeacher);

export default router;
