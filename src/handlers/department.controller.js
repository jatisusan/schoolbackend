import prisma from "../db/prisma.js";

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
};

const updateDepartment = async (req, res) => {};

const deleteDepartment = async (req, res) => {};

export {
  getAllDepartments,
  findDepartmentById,
  createDepartment,
  updateDepartment,
  deleteDepartment,
};
