import z from "zod";

export let registerValidatorSchema = z.object({
    email: z.email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
    username: z.string().min(4, "Username must be at least 4 characters long"),
})

export let loginValidatorSchema = z.object({
    email: z.email("Invalid email address"),
    password: z.string().min(1, "Password is required"),
})