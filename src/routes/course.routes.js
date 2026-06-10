import { createCourse, findCourseById, getAllCourses, updateCourse, deleteCourse } from "../handlers/course.controller.js"
import { Router } from "express";

let router = Router();
router.get("/", getAllCourses)
router.get("/:id", findCourseById)
router.post("/", createCourse)
router.put("/:id", updateCourse)
router.delete("/:id", deleteCourse)

export default router