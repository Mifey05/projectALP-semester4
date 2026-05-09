import express from "express";
import * as controller from "./course.controller.js";

const router = express.Router();

router.get("/", controller.getCourses);
router.get("/:id", controller.getCourseById);
router.post("/", controller.createCourse);
router.put("/:id", controller.updateCourse);
router.delete("/:id", controller.deleteCourse);

export default router;
