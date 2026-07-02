import { Router } from "express";

import { authMiddleware } from "../middlewares/auth_middleware.js";
import {
  getAllDepartments,
  findDepartmentById,
  createDepartment,
  updateDepartment,
  deleteDepartment,
} from "../handlers/department_handler.js";

let router = Router();

router.get("/", getAllDepartments);
router.get("/:id", findDepartmentById);
router.post("/", authMiddleware, createDepartment);
router.put("/:id", authMiddleware, updateDepartment);
router.delete("/:id", authMiddleware, deleteDepartment);

export default router;
