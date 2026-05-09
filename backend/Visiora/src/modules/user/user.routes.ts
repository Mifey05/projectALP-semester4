import express from "express";
import * as controller from "./user.controller.js";

const router = express.Router();

router.get("/", controller.getUsers);
router.get("/:id", controller.getUserById);
router.post("/", controller.createUser);
router.put("/:id", controller.updateUser);
router.delete("/:id", controller.deleteUser);

// Compatibility router for frontend contract (mounted under /api)
import * as userService from "./user.service.js";
import * as userMapper from "./user.mapper.js";

export const compatRouter = express.Router();
// profile endpoints (placeholder using user id 1)
compatRouter.get("/profile", async (req, res, next) => {
	try {
		const user = await userService.getUserById("1");
		res.json({ data: userMapper.toDto(user) });
	} catch (err) {
		next(err);
	}
});

compatRouter.put("/profile", async (req, res, next) => {
	try {
		const payload = req.body;
		await userService.updateUser("1", payload);
		res.json({ message: "Profile updated successfully" });
	} catch (err) {
		next(err);
	}
});

// subscription plans stub
compatRouter.get("/subscription-plans", (req, res) => {
	res.json({ data: [{ plan_id: 1, name: "Basic", tier: "free" }] });
});

// payment stub
compatRouter.post("/pay", (req, res) => {
	res.json({ message: "Payment processed (stub)" });
});

export default router;
