import prisma from "../db/prisma.js";
import {
  createDepartmentValidationSchema,
  updateDepartmentValidationSchema,
} from "../validators/zod_validator.js";
import z from "zod";

const getAllDepartments = async (req, res) => {
  const departments = await prisma.department.findMany({
    include: { teachers: true, students: true },
  });
  res.status(200).json({
    message: "All departments fetched successfully",
    data: departments,
  });
};

const findDepartmentById = async (req, res) => {
  const { id } = req.params;
  const department = await prisma.department.findUnique({
    where: { id: Number(id) },
    include: { teachers: true, students: true },
  });
  if (!department) {
    return res.status(404).json({ error: "Department not found" });
  }
  res.status(200).json({
    message: `Department with ID ${id} fetched successfully`,
    data: department,
  });
};

const createDepartment = async (req, res) => {
  try {
    createDepartmentValidationSchema.parse(req.body);
    const { name } = req.body;
    const newDepartment = await prisma.department.create({
      data: {
        name,
      },
    });
    res.status(201).json({
      message: "Department created successfully",
      data: newDepartment,
    });
  } catch (e) {
    if (e instanceof z.ZodError) {
      let errors = e.issues.map((err) => {
        return {
          field: err.path[0],
          message: err.message,
        };
      });
      res.status(400).json({
        message: "Validation failed",
        errors,
      });
    }
  }
};

const updateDepartment = async (req, res) => {
  try {
    updateDepartmentValidationSchema.parse(req.body);
    const { id } = req.params;
    const { name } = req.body;
    const updatedDepartment = await prisma.department.update({
      where: { id: Number(id) },
      data: { name },
    });

    res.status(200).json({
      message: "Department updated successfully",
      data: updatedDepartment,
    });
  } catch (e) {
    if (e instanceof z.ZodError) {
      let errors = e.issues.map((err) => {
        return {
          field: err.path[0],
          message: err.message,
        };
      });
      res.status(400).json({
        message: "Validation failed",
        errors,
      });
    }
  }
};

const deleteDepartment = async (req, res) => {
  const { id } = req.params;
  await prisma.department.delete({
    where: { id: Number(id) },
  });
  res.json({ message: "Department deleted successfully" });
};

export {
  getAllDepartments,
  findDepartmentById,
  createDepartment,
  updateDepartment,
  deleteDepartment,
};
