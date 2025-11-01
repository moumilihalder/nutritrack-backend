import express from "express";
import { verifyToken } from "../middleware/auth.js";
import { addProgress, getProgress } from "../controllers/trackController.js";

const router = express.Router();

router.post("/", verifyToken, addProgress);
router.get("/", verifyToken, getProgress);

export default router;
