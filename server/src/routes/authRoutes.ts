import express from "express";
import { getProfile, login, register } from "../controllers/authController";
import { auth } from "../middleware/auth";

const router = express.Router();

// Public routes
router.post("/register", register as express.RequestHandler);
router.post("/login", login as express.RequestHandler);
router.get("/profile", auth, getProfile);

export default router;
