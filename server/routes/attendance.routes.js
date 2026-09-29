import { Router } from "express";
import { protect } from "../middleware/auth.middleware.js";
import { clockInOut, getAttendance } from "../controllers/attendance.controller.js";

const attendanceRouter = Router();

attendanceRouter.post("/", protect, clockInOut);
attendanceRouter.get("/", protect, getAttendance);

export default attendanceRouter;