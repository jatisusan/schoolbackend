import z from "zod";

import prisma from "../db/prisma.js";
import {
  createCourseValidationSchema,
  updateCourseValidationSchema,
} from "../validators/zod_validator.js";

const getAllCourses = async (req, res) => {
  const courses = await prisma.course.findMany({ include: { teacher: true } });
  res
    .status(200)
    .json({ message: "All courses fetched successfully", data: courses });
};

const findCourseById = async (req, res) => {
  const { id } = req.params;
  const course = await prisma.course.findUnique({
    where: { id: Number(id) },
  });
  if (!course) {
    return res.status(404).json({ message: "Course not found" });
  }
  res.status(200).json({ message: "Course found successfully", data: course });
};

const createCourse = async (req, res) => {
  try {
    createCourseValidationSchema.parse(req.body);
    const { name, credits, teacherId } = req.body;
    const course = await prisma.course.create({
      data: {
        name,
        credits,
        teacher: { connect: { id: Number(teacherId) } },
      },
    });
    res
      .status(201)
      .json({ message: "Course created successfully", data: course });
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

const updateCourse = async (req, res) => {
  try {
    updateCourseValidationSchema.parse(req.body);
    const { id } = req.params;
    const { name, credits, teacherId } = req.body;
    const updatedCourse = await prisma.course.update({
      where: { id: Number(id) },
      data: { name, credits, teacher: { connect: { id: Number(teacherId) } } },
    });
    res
      .status(200)
      .json({ message: "Course updated successfully", data: updatedCourse });
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

const deleteCourse = async (req, res) => {
  const { id } = req.params;
  await prisma.course.delete({
    where: { id: Number(id) },
  });
  res.json({ message: "Course deleted successfully" });
};

export {
  getAllCourses,
  findCourseById,
  createCourse,
  updateCourse,
  deleteCourse,
};
