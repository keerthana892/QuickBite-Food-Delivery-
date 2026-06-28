import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import connectDB from "./utils/db.js";
import userRouter from "./routes/user.route.js";
import companyRouter from "./routes/company.route.js";
import jobRouter from "./routes/job.route.js";
import applicationRouter from "./routes/application.route.js";

const app = express();

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// ✅ FIXED CORS (important for deployment)
const corsOptions = {
  origin: [
    "http://localhost:5173",
    "https://your-frontend.vercel.app" // 👉 replace with your real Vercel URL
  ],
  credentials: true,
};
app.use(cors(corsOptions));

// routes (API)
app.use("/api/user", userRouter);
app.use("/api/company", companyRouter);
app.use("/api/job", jobRouter);
app.use("/api/application", applicationRouter);

// ✅ REMOVE frontend dist code ❌
// ❌ DO NOT USE express.static for frontend here

// ✅ Simple test route
app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

// ✅ FIX PORT handling
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
  connectDB();
});