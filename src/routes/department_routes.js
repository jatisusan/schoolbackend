import {
  getAllDepartments,
  findDepartmentById,
  createDepartment,
  updateDepartment,
  deleteDepartment,
} from "../handlers/department_handler.js";

import { Router } from "express";

let router = Router();

router.get("/", getAllDepartments);
router.get("/:id", findDepartmentById);
router.post("/", createDepartment);
router.put("/:id", updateDepartment);
router.delete("/:id", deleteDepartment);

export default router;
