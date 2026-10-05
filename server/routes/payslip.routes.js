import { Router } from "express";
import { createPayslip, getPayslips, getPayslipById } from "../controllers/payslip.controller.js";
import { protect, protectAdmin } from "../middleware/auth.middleware.js";

const payslipRouter = Router();

payslipRouter.post("/", protect, protectAdmin, createPayslip);
payslipRouter.get("/", protect, getPayslips);
payslipRouter.get("/:id", protect, getPayslipById);

export default payslipRouter;
