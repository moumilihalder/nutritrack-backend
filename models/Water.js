import mongoose from "mongoose";

const WaterSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    glasses: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const Water = mongoose.model("Water", WaterSchema);
export default Water;
