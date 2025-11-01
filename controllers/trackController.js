import Track from "../models/Track.js";

export const addProgress = async (req, res) => {
  try {
    const { weight, bmi, calories } = req.body;

    if (!weight || !bmi) {
      return res.status(400).json({ message: "Weight and BMI are required" });
    }

    const userId = req.user.id;

    const newTrack = new Track({
      userId,
      weight,
      bmi,
      calories,
      date: new Date(),
    });

    await newTrack.save();
    res.status(201).json({
      message: "Progress added successfully",
      track: newTrack,
    });
  } catch (err) {
    console.error("Error adding progress:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

export const getProgress = async (req, res) => {
  try {
    const userId = req.user.id;

    const trackData = await Track.find({ userId }).sort({ date: 1 });
    res.status(200).json(trackData);
  } catch (err) {
    console.error("Error fetching progress:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
