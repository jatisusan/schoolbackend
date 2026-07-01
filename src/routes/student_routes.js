import { createStudent, deleteStudent, findStudentById, getStudents, updateStudent } from "../handlers/student_handler.js";
import { Router } from "express";

let router = Router();
router.get("/", getStudents);

router.get("/:id", findStudentById);

router.post("/", createStudent);

router.put("/:id", updateStudent);

router.delete("/:id", deleteStudent);


export default router;