import prisma from "../db/prisma.js";

const getAllEnrollments = async (req, res) => {
  const enrollments = await prisma.enrollment.findMany();
  res.status(200).json({
    message: "All enrollments fetched successfully",
    data: enrollments,
  });
};

const findEnrollmentById = async (req, res) => {
  const { id } = req.params;
  const enrollment = await prisma.enrollment.findUnique({
    where: { id: Number(id) },
  });
  if (!enrollment) {
    return res.status(404).json({ error: "Enrollment not found" });
  }
  res
    .status(200)
    .json({ message: "Enrollment found successfully", data: enrollment });
};

const createEnrollment = async (req, res) => {
  const { studentId, courseId } = req.body;
  const newEnrollment = await prisma.enrollment.create({
    data: {
      student: {
        connect: { id: Number(studentId) },
      },
      course: {
        connect: { id: Number(courseId) },
      },
    },
  });

  res.status(201).json({
    message: "Enrollment created successfully",
    data: newEnrollment,
  });
};

const updateEnrollment = async (req, res) => {
  const { id } = req.params;
  const { studentId, courseId } = req.body;
  const updatedEnrollment = await prisma.enrollment.update({
    where: { id: Number(id) },
    data: {
      student: {
        connect: { id: Number(studentId) },
      },
      course: {
        connect: { id: Number(courseId) },
      },
    },
  });

  res.status(200).json({
    message: "Enrollment updated successfully",
    data: updatedEnrollment,
  });
};

const deleteEnrollment = async (req, res) => {
  const { id } = req.params;
  await prisma.enrollment.delete({
    where: { id: Number(id) },
  });
  res.json({ message: "Enrollment deleted successfully" });
};

export {
  getAllEnrollments,
  findEnrollmentById,
  createEnrollment,
  updateEnrollment,
  deleteEnrollment,
};
