import express from "express";
import * as controller from "./template.controller.js";

const router = express.Router();

router.get("/", controller.getTemplates);
router.post("/:id/use", controller.useTemplate);

export default router;