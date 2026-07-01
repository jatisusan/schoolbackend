import z from "zod";

import prisma from "../db/prisma.js";
import {
  createStudentValidationSchema,
  updateStudentValidationSchema,
} from "../validators/zod_validator.js";

const getStudents = async (req, res) => {
  try {
    const students = await prisma.student.findMany();
    res.json({ message: "Students retrieved successfully", data: students });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const findStudentById = async (req, res) => {
  const { id } = req.params;
  let matchStudent = await prisma.student.findUnique({
    where: { id: Number(id) },
  });
  if (!matchStudent) {
    return res.status(404).json({ error: "Student not found" });
  }
  res.status(200).json({
    message: `Student with ID ${id} retrieved successfully`,
    data: matchStudent,
  });
};

const createStudent = async (req, res) => {
  try {
    createStudentValidationSchema.parse(req.body);
    const { name, email, rollNo, departmentId } = req.body;

    let createdStudent = await prisma.student.create({
      data: {
        name,
        email,
        rollNo,
        department: { connect: { id: Number(departmentId) } },
      },
    });
    res.status(201).json({
      message: "Student created successfully",
      data: createdStudent,
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

const updateStudent = async (req, res) => {
  try {
    updateStudentValidationSchema.parse(req.body);
    const { id } = req.params;
    const { name, email, rollNo, departmentId } = req.body;

    let updatedStudent = await prisma.student.update({
      where: { id: Number(id) },
      data: {
        name,
        email,
        rollNo,
        department: { connect: { id: Number(departmentId) } },
      },
    });
    res.status(200).json({
      message: "Student updated successfully",
      data: updatedStudent,
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

const deleteStudent = async (req, res) => {
  const { id } = req.params;

  await prisma.student.delete({
    where: { id: Number(id) },
  });
  res.status(200).json({
    message: "Student deleted successfully",
  });
};

export {
  getStudents,
  findStudentById,
  createStudent,
  updateStudent,
  deleteStudent,
};
