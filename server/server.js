import express from "express";
import cors from "cors";
import multer from "multer";
import "dotenv/config";
import connectDB from "./config/db.js";
import authRouter from "./routes/auth.routes.js";
import employeeRouter from "./routes/employee.routes.js";
import profileRouter from "./routes/profile.routes.js";
import attendanceRouter from "./routes/attendance.routes.js";
import leaveRouter from "./routes/leaveApplication.routes.js";

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());
app.use(multer().none());


app.get("/", (req, res) => res.send("Server is running..."));
app.use("/api/auth", authRouter);
app.use("/api/employees", employeeRouter);
app.use("/api/profile", profileRouter);
app.use("/api/attendance", attendanceRouter);
app.use("/api/leave", leaveRouter);

await connectDB();
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));