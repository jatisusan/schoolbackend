import { Router } from "express";
import {
  getUserProfile,
  loginUser,
  registerUser,
  updateUserProfile,
} from "../handlers/auth_handler.js";
import { authMiddleware } from "../middlewares/auth_middleware.js";
import { upload } from "../middlewares/upload_middleware.js";

const router = Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", authMiddleware, getUserProfile);
router.put(
  "/profile",
  authMiddleware,
  upload.single("profile-image"),
  updateUserProfile,
);

export default router;
