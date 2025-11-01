import Workout from "../models/Workout.js";

export const addWorkout = async (req, res) => {
  try {
    console.log("POST /api/workouts called by user:", req.user);
    console.log("Request body:", req.body);

    const userId = req.user?.id;
    const { exercise, duration, calories, date } = req.body;

    if (!userId) {
      console.log("Missing user ID");
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    if (!exercise || duration == null || calories == null) {
      console.log("Missing fields:", { exercise, duration, calories });
      return res
        .status(400)
        .json({ success: false, message: "Missing required fields" });
    }

    const newWorkout = new Workout({
      userId,
      exercise,
      duration,
      calories,
      date: date ? new Date(date) : new Date(),
    });

    await newWorkout.save();
    console.log("Workout saved:", newWorkout);

    res.status(201).json({
      success: true,
      message: "Workout saved successfully",
      data: newWorkout,
    });
  } catch (err) {
    console.error("Error saving workout:", err);
    res
      .status(500)
      .json({ success: false, message: "Server error", error: err.message });
  }
};

export const getWorkouts = async (req, res) => {
  try {
    const userId = req.user?.id;
    if (!userId)
      return res.status(401).json({ success: false, message: "Unauthorized" });

    const workouts = await Workout.find({ userId }).sort({ date: -1 });
    res.json({ success: true, data: workouts });
  } catch (err) {
    console.error("Error fetching workouts:", err);
    res
      .status(500)
      .json({ success: false, message: "Server error", error: err.message });
  }
};

export const updateWorkout = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user?.id;

    const updatedWorkout = await Workout.findOneAndUpdate(
      { _id: id, userId },
      req.body,
      { new: true }
    );

    if (!updatedWorkout)
      return res
        .status(404)
        .json({ success: false, message: "Workout not found" });

    res.json({
      success: true,
      message: "Workout updated successfully",
      data: updatedWorkout,
    });
  } catch (err) {
    console.error("Error updating workout:", err);
    res
      .status(500)
      .json({ success: false, message: "Server error", error: err.message });
  }
};

export const deleteWorkout = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user?.id;

    const deletedWorkout = await Workout.findOneAndDelete({ _id: id, userId });

    if (!deletedWorkout)
      return res
        .status(404)
        .json({ success: false, message: "Workout not found" });

    res.json({ success: true, message: "Workout deleted successfully" });
  } catch (err) {
    console.error("Error deleting workout:", err);
    res
      .status(500)
      .json({ success: false, message: "Server error", error: err.message });
  }
};
