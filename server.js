import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import trackRoutes from "./routes/trackRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import waterRoutes from "./routes/water.js";
import workoutRoutes from "./routes/workout.js";

dotenv.config();


connectDB();

const app = express();


app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://nutritrack-frontend.vercel.app",
    ],
    credentials: true,
  })
);

app.use(express.json());


app.get("/", (req, res) => {
  res.send("NutriTrack Backend Running 🚀");
});


app.use("/api/auth", authRoutes);
app.use("/api/track", trackRoutes);
app.use("/api/water", waterRoutes);
app.use("/api/workouts", workoutRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


export default app;
