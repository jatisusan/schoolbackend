import { findEnrollmentById, getAllEnrollments, enrollStudentInCourse } from "../handlers/enrollment.controller.js"
import { Router } from "express";

let router = Router();
router.get("/", getAllEnrollments)
router.get("/:id", findEnrollmentById)
router.post("/", enrollStudentInCourse)

export default router