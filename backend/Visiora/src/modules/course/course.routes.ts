import express from "express";
import * as courseController from "./course.controller.js";
import { authMiddleware } from "../../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/", authMiddleware, courseController.getCourses);
router.get("/:id", authMiddleware, courseController.getCourseById);

export default router;