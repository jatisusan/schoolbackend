import prisma from "../db/prisma.js";

const getAllTeachers = async (req, res) => {
  const teachers = await prisma.teacher.findMany({
    include: { department: true, courses: true },
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

const updateTeacher = async (req, res) => {
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
  updateTeacher,
  deleteTeacher,
};
