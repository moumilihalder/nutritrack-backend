import mongoose from "mongoose";

const trackSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
    weight: {
      type: Number,
      required: true,
    },
    bmi: {
      type: Number,
      required: true,
    },
    calories: {
      type: Number,
      required: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Track", trackSchema);
