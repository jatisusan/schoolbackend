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

const enrollStudentInCourse = async (req, res) => {
  try {
    let { student_id, course_id, enrolled_at } = req.body;

    if (!student_id || !course_id) {
      return res.status(400).json({
        error: "student_id and course_id are required!",
      });
    }

    if (isNaN(student_id) || Number(student_id) <= 0) {
      return res.status(400).json({ error: "Invalid student_id!" });
    }

    if (isNaN(course_id) || Number(course_id) <= 0) {
      return res.status(400).json({ error: "Invalid course_id!" });
    }

    if (enrolled_at && isNaN(Date.parse(enrolled_at))) {
      return res.status(400).json({
        error: "Invalid enrolled_at date!",
      });
    }

    const newEnrollment = await prisma.enrollment.create({
      data: {
        // student_id: Number(student_id),
        student: { connect: { id: Number(student_id) } },
        course: { connect: { id: Number(course_id) } },
        enrolledAt: Date.parse(enrolled_at)
          ? new Date(enrolled_at)
          : new Date(),
      },
      include: {
        student: true,
        course: true,
      },
      
    });

    res.status(201).json({
      message: "Student enrolled in course successfully",
      data: newEnrollment,
    });
  } catch (error) {
    res.status(500).json({
      error: "Error enrolling student in course",
      stack: error.message,
    });
  }
};

export { getAllEnrollments, findEnrollmentById, enrollStudentInCourse };
