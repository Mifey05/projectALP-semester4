import express from "express";
import * as controller from "./design.controller.js";

const router = express.Router();

router.get("/", controller.getDesigns);
router.get("/:id", controller.getDesignById);
router.post("/", controller.createDesign);
router.put("/:id", controller.updateDesign);
router.delete("/:id", controller.deleteDesign);

// Compatibility router for frontend contract
export const compatRouter = express.Router();
compatRouter.get("/design/history", controller.getDesigns);

export default router;
