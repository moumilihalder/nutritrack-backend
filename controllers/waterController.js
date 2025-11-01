import Water from "../models/Water.js";

const formatDate = (d = new Date()) => {
  const iso = new Date(d).toISOString();
  return iso.slice(0, 10);
};

export const getWater = async (req, res) => {
  try {
    const userId = req.user._id; 
    const date = req.query.date || formatDate();
    const doc = await Water.findOne({ user: userId, date });

    res.json({
      success: true,
      data: doc || { user: userId, date, glasses: 0 },
    });
  } catch (err) {
    console.error("Error in getWater:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const upsertWater = async (req, res) => {
  try {
    const userId = req.user._id;
    const { date = formatDate(), glasses = 0 } = req.body;

    if (glasses < 0)
      return res
        .status(400)
        .json({ success: false, message: "glasses must be >= 0" });

    const doc = await Water.findOneAndUpdate(
      { user: userId, date },
      { $set: { glasses } },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );

    res.json({ success: true, data: doc });
  } catch (err) {
    console.error("Error in upsertWater:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
