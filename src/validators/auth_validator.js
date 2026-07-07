import z from "zod";

let emailValidator = z.email("Invalid email address!");
let usernameValidator = z
  .string()
  .min(4, "Username must be at least 4 characters long");
let passwordValidator = z
  .string()
  .min(6, "Password must be at least 6 characters long");

export let registerValidatorSchema = z.object({
  email: emailValidator,
  password: passwordValidator,
  username: usernameValidator,
});

export let loginValidatorSchema = z.object({
  email: emailValidator,
  password: z.string().min(1, "Password is required"),
});

export let updateProfileValidatorSchema = z.object({
  username: usernameValidator,
  email: emailValidator,
});
