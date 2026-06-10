import {
  createTeacher,
  findTeacherById,
  getAllTeachers,
  updateTeacher,
  deleteTeacher,
} from "../handlers/teacher.controller.js";
import { Router } from "express";

let router = Router();

router.get("/", getAllTeachers);
router.get("/:id", findTeacherById);
router.post("/", createTeacher);
router.put("/:id", updateTeacher);
router.delete("/:id", deleteTeacher);

export default router;
