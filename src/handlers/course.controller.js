import prisma from "../db/prisma.js";

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
};

const updateCourse = async (req, res) => {
  const { id } = req.params;
  const { name, credits, teacherId } = req.body;
  const updatedCourse = await prisma.course.update({
    where: { id: Number(id) },
    data: { name, credits, teacher: { connect: { id: Number(teacherId) } } },
  });
  res
    .status(200)
    .json({ message: "Course updated successfully", data: updatedCourse });
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
