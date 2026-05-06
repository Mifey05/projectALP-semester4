import express from "express";
import * as designController from "./design.controller.js";

const router = express.Router();

router.get("/", designController.getDesigns);
router.post("/", designController.createDesign);
router.patch("/:id", designController.updateDesign);

export default router;
