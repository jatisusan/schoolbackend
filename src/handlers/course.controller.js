import prisma from "../db/prisma.js";

const getAllCourses = async (req, res) => {
  const courses = await prisma.course.findMany();
  res
    .status(200)
    .json({ message: "All courses fetched successfully", data: courses });
};

const findCourseById = async (req, res) => {};

const createCourse = async (req, res) => {};

const updateCourse = async (req, res) => {};

const deleteCourse = async (req, res) => {};

export {
  getAllCourses,
  findCourseById,
  createCourse,
  updateCourse,
  deleteCourse,
};
