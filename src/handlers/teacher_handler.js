import z from "zod";

import prisma from "../db/prisma.js";
import {
  createTeacherValidationSchema,
  createTeacherWithDepartmentValidationSchema,
  updateTeacherValidationSchema,
} from "../validators/zod_validator.js";

const getAllTeachers = async (req, res) => {
  const teachers = await prisma.teacher.findMany({
    include: {
      department: { select: { id: true, name: true } },
      courses: true,
    },
  });
  res
    .status(200)
    .json({ message: "All teachers fetched successfully", data: teachers });
};

// sorting with orderBy
export const sortTeachers = async (req, res) => {
  const teachers = await prisma.teacher.findMany({
    orderBy: { name: "asc" },
  });
  res
    .status(200)
    .json({ message: "Teachers sorted successfully", data: teachers });
};

// filtering with where
export const filterTeachers = async (req, res) => {
  const teachers = await prisma.teacher.findMany({
    where: {
      name: {
        gte: "a",
      },
    },
  });

  res.json({
    message: "Filtered teachers successfully",
    data: teachers,
  });
};

export const getAllTeachersWithSelect = async (req, res) => {
  const teachers = await prisma.teacher.findMany({
    select: {
      id: true,
      name: true,
      department: { select: { id: true, name: true } },
    },
  });

  res
    .status(200)
    .json({ message: "All teachers fetched successfully", data: teachers });
};

const findTeacherById = async (req, res) => {
  const { id } = req.params;
  const teacher = await prisma.teacher.findUnique({
    where: { id: Number(id) },
  });
  if (!teacher) {
    return res.status(404).json({ error: "Teacher not found" });
  }
  res.status(200).json({
    message: `Teacher with ID ${id} fetched successfully`,
    data: teacher,
  });
};

const createTeacher = async (req, res) => {
  let result = createTeacherValidationSchema.safeParse(req.body);
  if (!result.success) {
    let errors = result.error.issues.map((err) => {
      return {
        field: err.path[0],
        message: err.message,
      };
    });

    return res.status(400).json({
      message: "Validation failed",
      errors,
    });
  }
  const { name, email, departmentId } = req.body;
  const newTeacher = await prisma.teacher.create({
    data: {
      name,
      email,
      department: {
        connect: { id: Number(departmentId) },
      },
    },
  });
  res.status(201).json({
    message: "Teacher created successfully",
    data: newTeacher,
  });
};

// using create prisma relation
const createTeacherWithDepartment = async (req, res) => {
  try {
    createTeacherWithDepartmentValidationSchema.parse(req.body);
    const { name, email, departmentName } = req.body;
    const newTeacher = await prisma.teacher.create({
      data: {
        name,
        email,
        department: {
          create: { name: departmentName },
        },
      },
    });
    res.status(201).json({
      message: "Teacher created successfully",
      data: newTeacher,
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

const updateTeacher = async (req, res) => {
  try {
    updateTeacherValidationSchema.parse(req.body);
    const { id } = req.params;
    const { name, email, departmentId } = req.body;
    const updatedTeacher = await prisma.teacher.update({
      where: { id: Number(id) },
      data: {
        name,
        email,
        department: {
          connect: { id: Number(departmentId) },
        },
      },
    });

    res.status(200).json({
      message: "Teacher updated successfully",
      data: updatedTeacher,
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

const deleteTeacher = async (req, res) => {
  const { id } = req.params;
  await prisma.teacher.delete({
    where: { id: Number(id) },
  });

  res.json({ message: "Teacher deleted successfully" });
};

export {
  getAllTeachers,
  findTeacherById,
  createTeacher,
  createTeacherWithDepartment,
  updateTeacher,
  deleteTeacher,
};
