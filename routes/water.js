import express from "express";
import { verifyToken } from "../middleware/auth.js";
import Water from "../models/Water.js";

const router = express.Router();

/**
 * @route   GET /api/water
 * @desc    Get the user's current water record
 * @access  Private
 */
router.get("/", verifyToken, async (req, res) => {
  try {
    console.log("GET /api/water by user:", req.user?.id);

    const record = await Water.findOne({ userId: req.user.id });
    res.json(record || { glasses: 0 });
  } catch (err) {
    console.error("🔥 Error fetching water data:", err);
    res.status(500).json({ message: "Error fetching water data", error: err.message });
  }
});

/**
 * @route   POST /api/water
 * @desc    Update or create the user’s water record
 * @access  Private
 */
router.post("/", verifyToken, async (req, res) => {
  try {
    console.log("POST /api/water by user:", req.user);
    console.log("Request body:", req.body);

    const { glasses } = req.body;
    if (glasses == null) {
      return res.status(400).json({ message: "Missing 'glasses' in body" });
    }

    const record = await Water.findOneAndUpdate(
      { userId: req.user.id },
      { glasses },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );

    console.log("Water data saved successfully:", record);
    res.json(record);
  } catch (err) {
    console.error("Error saving water data:", err);
    res.status(500).json({ message: "Error saving water data", error: err.message });
  }
});

export default router;
