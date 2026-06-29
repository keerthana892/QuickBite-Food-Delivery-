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

// ================= MIDDLEWARES =================
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// ✅ FINAL CORS FIX (VERY IMPORTANT)
app.use(cors({
  origin: true, // allow all origins
  credentials: true
}));

// ✅ Handle preflight & headers manually (fixes Render + Vercel issue)
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", req.headers.origin);
  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );

  // Handle OPTIONS request (important for login)
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }

  next();
});

// ================= ROUTES =================
app.use("/api/user", userRouter);
app.use("/api/company", companyRouter);
app.use("/api/job", jobRouter);
app.use("/api/application", applicationRouter);

// ✅ Test route
app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

// ================= PORT =================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
  connectDB();
});