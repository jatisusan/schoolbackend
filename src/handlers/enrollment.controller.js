import prisma from "../db/prisma.js";


const getAllEnrollments = async (req, res) => {
    const enrollments = await prisma.enrollment.findMany();
    res
      .status(200)
      .json({ message: "All enrollments fetched successfully", data: enrollments });
}

const findEnrollmentById = async (req, res) => {}

const createEnrollment = async (req, res) => {}

const updateEnrollment = async (req, res) => {}

const deleteEnrollment = async (req, res) => {}

export {
    getAllEnrollments,
    findEnrollmentById,
    createEnrollment,
    updateEnrollment,
    deleteEnrollment
}