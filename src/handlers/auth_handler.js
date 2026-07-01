import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import prisma from "../db/prisma.js";
import {
  loginValidatorSchema,
  registerValidatorSchema,
} from "../validators/auth_validator.js";

export let registerUser = async (req, res) => {
  // Step1: Validate the request data
  let result = registerValidatorSchema.safeParse(req.body);

  if (!result.success) {
    const errors = result.error.issues.map((err) => {
      return {
        field: err.path[0],
        message: err.message,
      };
    });
    return res.status(400).json({
      success: false,
      message: "Validation failed",
      errors,
    });
  }

  let { email, password, username } = result.data;

  try {
    // Step2: hash the password before saving using bcrypt
    // bcrypt.hash(password, saltRounds)
    // bcrypt.hash runs the hashing algorithm 2^saltRounds times, making it slower and more secure against brute-force attacks.
    let hashedPassword = await bcrypt.hash(password, 10);

    // Step3: Save the user with hashed password to the database
    const user = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
      },
    });

    // exclude password from the response
    res.status(201).json({
      success: true,
      message: "User registered successfully",
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (e) {
    res.status(500).json({
      success: false,
      message: "Something went wrong while registering the user",
      error: e.message,
    });
  }
};

// login steps:
// 1. Validate the request data
// 2. Check if the user exists in the database
// 3. Compare the provided password with the hashed password in the database using bcrypt.compare()
// 4. Generate or sign the jwt token with payload
// 5. Send token to client through response
export let loginUser = async (req, res) => {
  // validating incoming data (email and password)
  let vResult = loginValidatorSchema.safeParse(req.body);
  if (!vResult.success) {
    let allErrors = vResult.error.issues.map((err) => {
      return {
        field: err.path[0],
        message: err.message,
      };
    });
    res.status(400).json({
      success: false,
      message: "Validation failed",
      errors: allErrors,
    });
  }

  try {
    let { email, password } = vResult.data;

    // check if user exists in the database
    let foundUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (!foundUser) {
      return res.status(404).json({
        success: false,
        message: `User with email ${email} not found!`,
      });
    }

    // compare the provided password with the hashed password using bcrypt.compare()
    let isPasswordMatched = await bcrypt.compare(password, foundUser.password);
    if (!isPasswordMatched) {
      return res.status(401).json({
        success: false,
        message: "Invalid password!",
      });
    }

    // generate jwt token with payload and expiry
    let token = await jwt.sign(
      { id: foundUser.id, email: foundUser.email, role: foundUser.role }, // payload to store user info
      process.env.JWT_SECRET, // jwt secret key
      { expiresIn: "2d" }, // options
    );

    // send the token to client in response
    res.status(200).json({
      success: true,
      message: "User logged in successfully",
      token,
    });
  } catch (e) {
    res.status(500).json({
      success: false,
      message: "Something went wrong while logging in the user",
      error: e.message,
    });
  }
};
