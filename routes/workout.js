import express from "express";
import { verifyToken } from "../middleware/auth.js";
import {
  addWorkout,
  getWorkouts,
  updateWorkout,
  deleteWorkout,
} from "../controllers/workoutController.js";

const router = express.Router();

router.post("/", verifyToken, addWorkout);
router.get("/", verifyToken, getWorkouts);
router.put("/:id", verifyToken, updateWorkout);
router.delete("/:id", verifyToken, deleteWorkout);

export default router;
