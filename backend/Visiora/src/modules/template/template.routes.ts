import express from "express";
import * as controller from "./template.controller.js";

const router = express.Router();

router.get("/", controller.getTemplates);
router.post("/:id/use", controller.useTemplate);

// Compatibility router for frontend contract
export const compatRouter = express.Router();
compatRouter.get("/template", controller.getTemplates);

export default router;