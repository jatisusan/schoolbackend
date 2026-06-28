import z from "zod";

let nameValidator = z
  .string()
  .min(2, "Name must be at least 2 characters long!")
  .max(50, "Name must be at most 50 characters long!");

let emailValidator = z.email("Invalid email address!");

let idValidator = z.int().nonnegative("ID cannot be negative!");

let rollNoValidator = z.int().nonnegative("Roll number cannot be negative!");

let creditsValidator = z.int().nonnegative("Credits cannot be negative!");

export let createTeacherValidationSchema = z.object({
  name: nameValidator,
  email: emailValidator,
  departmentId: idValidator,
});

export let updateTeacherValidationSchema = z.object({
  name: nameValidator,
  email: emailValidator,
  departmentId: idValidator,
});

export let createTeacherWithDepartmentValidationSchema = z.object({
  name: nameValidator,
  email: emailValidator,
  departmentName: nameValidator,
});

export let createStudentValidationSchema = z.object({
  name: nameValidator,
  email: emailValidator,
  rollNo: rollNoValidator,
  departmentId: idValidator,
});

export let updateStudentValidationSchema = z.object({
  name: nameValidator,
  email: emailValidator,
  rollNo: rollNoValidator,
});

export let createCourseValidationSchema = z.object({
  name: nameValidator,
  credits: creditsValidator,
  teacherId: idValidator,
});

export let updateCourseValidationSchema = z.object({
  name: nameValidator,
  credits: creditsValidator,
  teacherId: idValidator,
});

export let createDepartmentValidationSchema = z.object({
  name: nameValidator,
});

export let updateDepartmentValidationSchema = z.object({
  name: nameValidator,
});
