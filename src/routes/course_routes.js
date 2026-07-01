import { createCourse, findCourseById, getAllCourses, updateCourse, deleteCourse } from "../handlers/course_handler.js"
import { Router } from "express";
import { authMiddleware } from "../middlewares/auth_middleware.js";

let router = Router();
router.get("/", getAllCourses)
router.get("/:id", findCourseById)
router.post("/", authMiddleware, createCourse)
router.put("/:id", authMiddleware, updateCourse)
router.delete("/:id", authMiddleware, deleteCourse)

export default router