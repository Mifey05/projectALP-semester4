import express from "express";
import * as courseController from "./course.controller.js";

const router = express.Router();

router.get("/", courseController.getCourses);
router.get("/:id", courseController.getCourseById);

export default router;
