import { createEnrollment, findEnrollmentById, getAllEnrollments, updateEnrollment, deleteEnrollment } from "../handlers/enrollment.controller.js"
import { Router } from "express";

let router = Router();
router.get("/", getAllEnrollments)
router.get("/:id", findEnrollmentById)
router.post("/", createEnrollment)
router.put("/:id", updateEnrollment)
router.delete("/:id", deleteEnrollment)

export default router