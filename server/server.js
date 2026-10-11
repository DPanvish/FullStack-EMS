import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import multer from "multer";
import "dotenv/config";
import connectDB from "./config/db.js";
import authRouter from "./routes/auth.routes.js";
import employeeRouter from "./routes/employee.routes.js";
import profileRouter from "./routes/profile.routes.js";
import attendanceRouter from "./routes/attendance.routes.js";
import leaveRouter from "./routes/leaveApplication.routes.js";
import payslipRouter from "./routes/payslip.routes.js";
import dashboardRouter from "./routes/dashboard.routes.js";
import { serve } from "inngest/express";
import { inngest, functions } from "./inngest/index.js";

const app = express();
const PORT = process.env.PORT || 4000;

const allowedOrigins = [
  process.env.CLIENT_URL,
  "http://localhost:5173",
  "http://localhost:3000",
  "http://127.0.0.1:5173",
].filter(Boolean);

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin) || origin.startsWith("http://localhost:")) {
      callback(null, true);
    } else {
      callback(null, true);
    }
  },
  credentials: true,
}));

app.use(cookieParser());
app.use(express.json());
app.use(multer().none());

app.get("/", (req, res) => res.send("Server is running..."));
app.use("/api/auth", authRouter);
app.use("/api/employees", employeeRouter);
app.use("/api/profile", profileRouter);
app.use("/api/attendance", attendanceRouter);
app.use("/api/leave", leaveRouter);
app.use("/api/payslips", payslipRouter);
app.use("/api/dashboard", dashboardRouter);

app.use("/api/inngest", serve({ client: inngest, functions }));

await connectDB();
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));