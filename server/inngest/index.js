import { Inngest } from "inngest";
import Attendance from "../models/Attendance.js";
import Employee from "../models/Employee.js";
import LeaveApplication from "../models/LeaveApplication.js";
import sendEmail from "../config/nodemailer.js";

export const inngest = new Inngest({ id: "fullstack-ems" });

const premiumEmailTemplate = ({title, intro, highlightLabel, highlightValue, body, footerNote}) => `
  <div style="margin:0; padding:0; background:#f6f4ef; font-family:Inter, Arial, sans-serif; color:#101b2d;">
    <div style="max-width:640px; margin:0 auto; padding:32px 18px;">
      <div style="background:#ffffff; border:1px solid #d8c79f66; border-radius:18px; overflow:hidden; box-shadow:0 18px 44px rgba(3, 8, 18, 0.10);">
        <div style="background:linear-gradient(135deg, #030812 0%, #101b2d 58%, #223248 100%); padding:28px 30px; border-bottom:3px solid #c5a76a;">
          <p style="margin:0 0 10px; color:#d8c79f; font-size:12px; font-weight:700; letter-spacing:0.12em; text-transform:uppercase;">Employee Management System</p>
          <h1 style="margin:0; color:#f6f4ef; font-size:24px; line-height:1.25; font-weight:700;">${title}</h1>
        </div>

        <div style="padding:30px;">
          <p style="margin:0 0 18px; color:#223248; font-size:16px; line-height:1.65;">${intro}</p>

          <div style="margin:22px 0; padding:18px 20px; background:#f6f4ef; border:1px solid #d8c79f80; border-left:4px solid #c5a76a; border-radius:12px;">
            <p style="margin:0 0 6px; color:#a8863f; font-size:12px; font-weight:700; letter-spacing:0.08em; text-transform:uppercase;">${highlightLabel}</p>
            <p style="margin:0; color:#070e19; font-size:22px; line-height:1.3; font-weight:800;">${highlightValue}</p>
          </div>

          <div style="color:#223248; font-size:16px; line-height:1.65;">${body}</div>

          ${footerNote ? `<p style="margin:22px 0 0; color:#223248; font-size:14px; line-height:1.55;">${footerNote}</p>` : ""}

          <div style="margin-top:30px; padding-top:20px; border-top:1px solid #ebe3d1;">
            <p style="margin:0; color:#223248; font-size:15px;">Best Regards,</p>
            <p style="margin:4px 0 0; color:#070e19; font-size:16px; font-weight:800;">QuickEMS</p>
          </div>
        </div>
      </div>
    </div>
  </div>
`;

// Auto check-out for employees
const autoCheckOut = inngest.createFunction(
  {id: "auto-check-out", triggers: [{event: "employee/check-out"}]},
  async({event, step}) => {
    const {employeeId, attendanceId} = event.data;
    
    // wait for 9 hours
    await step.sleepUntil("wait-for-the-9-hours", new Date(new Date().getTime() + 9 * 60 * 60 * 1000));

    // get attendance data
    let attendance = await Attendance.findById(attendanceId);
    
    if(!attendance?.checkOut){
      const employee = await Employee.findById(employeeId);

      // send remainder email
      await sendEmail({
        to: employee.email,
        subject: "Attendance Check-out Reminder",
        body: premiumEmailTemplate({
          title: "Attendance Check-out Reminder",
          intro: `Hi ${employee.firstName}, you have an active check-in recorded for ${employee.department} today.`,
          highlightLabel: "Check-in time",
          highlightValue: attendance?.checkIn?.toLocaleTimeString(),
          body: `
            <p style="margin:0 0 12px;">Please make sure to check out within one hour.</p>
            <p style="margin:0;">If you have any questions, please contact your admin.</p>
          `,
        })
      })

      // after 10 hours, mark attendance as checked out with status "LATE"
      await step.sleepUntil("wait-for-the-1-hour", new Date(new Date().getTime() + 1 * 60 * 60 * 1000));

      attendance = await Attendance.findById(attendanceId);

      if(!attendance?.checkOut){
        attendance.checkOut = new Date(new Date(attendance.checkIn).getTime() + 4 * 60 * 60 * 1000);
        attendance.workingHours = 4;
        attendance.dayType = "Half Day";
        attendance.status = "LATE";
        await attendance.save();
      }
    }
  }
);

// Send email to admin, If admin doesn't take action on leave application within 24 hours
const leaveApplicationReminder = inngest.createFunction(
  {id: "leave-application-reminder", triggers: [{event: "leave/pending"}]},
  async({event, step}) => {
    const {leaveApplicationId} = event.data;

    // wait for 24 hours
    await step.sleepUntil("wait-for-the-24-hours", new Date(new Date().getTime() + 24 * 60 * 60 * 1000));

    const leaveApplication = await LeaveApplication.findById(leaveApplicationId);

    if(leaveApplication?.status === "PENDING"){
      const employee = await Employee.findById(leaveApplication.employeeId);

      // send reminder email to admin to take action on leave application
      await sendEmail({
        to: process.env.ADMIN_EMAIL,
        subject: "Leave Application Reminder",
        body: premiumEmailTemplate({
          title: "Leave Application Reminder",
          intro: `Hi Admin, a leave application from ${employee.department} is still waiting for review.`,
          highlightLabel: "Leave start date",
          highlightValue: leaveApplication?.startDate?.toLocaleDateString(),
          body: `
            <p style="margin:0;">Please review and take action on this leave application.</p>
          `,
        })
      })
    }
  }
)

// Cron: Check attendance at 11:30 AM IST and email absent employees
const attendanceReminderCron = inngest.createFunction(
  {id: "attendance-reminder-cron", triggers: [{cron: "0 0 6 * * *"}]},
  // 06:)) UTC = 11:30 AM IST
  async({step}) => {

    // get today's date range (IST)
    const today = await step.run("get-today-date", () => {
      const startUTC = new Date(new Date().toLocaleDateString("en-CA", {timeZone: "Asia/kolkata"}) + "T00:00:00+05:30");
      const endUTC = new Date(startUTC.getTime() + 24 * 60 * 60 * 1000);
      return {startUTC: startUTC.toISOString(), endUTC: endUTC.toISOString()}
    })

    // get all active, non-deleted employees
    const activeEmployees = await step.run("get-active-employees", async() => {
      const employees = await Employee.find({
        isDeleted: false,
        employmentStatus: "ACTIVE",
      }).lean();

      return employees.map((e) => ({_id: e._id.toString(), firstName: e.firstName, lastName: e.lastName, email: e.email, department: e.department}));
    })

    // get employee ID's on approved leave today
    const onLeaveIds = await step.run("get-on-leave-ids", async() => {
      const leaves = await LeaveApplication.find({
        status: "APPROVED",
        startDate: {$lte: new Date(today.endUTC)},
        endDate: {$gte: new Date(today.startUTC)},
      }).lean();

      return leaves.map((leave) => leave.employeeId.toString());
    })

    // get employee IDs who already checked in today
    const checkedInIds = await step.run("get-checked-in-ids", async() => {
      const attendances = await Attendance.find({
        date: {$gte: new Date(today.startUTC), $lt: new Date(today.endUTC)},
      }).lean();

      return attendances.map((attendance) => attendance.employeeId.toString());
    })

    // filter absent employees (not on leave & not checked in)
    const absentEmployees = activeEmployees.filter((emp) => !onLeaveIds.includes(emp._id) && !checkedInIds.includes(emp._id));

    // send reminder emails
    if(absentEmployees.length > 0){
      await step.run("send-reminder-emails", async() => {
        const emailPromises = absentEmployees.map((emp) => {
          // send email
          return sendEmail({
            to: emp.email,
            subject: "Attendance Reminder - Please Mark Your Attendance",
            body: premiumEmailTemplate({
              title: "Attendance Reminder",
              intro: `Hi ${emp.firstName}, we noticed you have not marked your attendance yet today.`,
              highlightLabel: "Attendance deadline",
              highlightValue: "11:30 AM",
              body: `
                <p style="margin:0 0 12px;">Your attendance is still missing. Please check in as soon as possible.</p>
                <p style="margin:0;">If you are facing any issues, please contact your admin.</p>
              `,
              footerNote: `Department: ${emp.department}`,
            })
          })
        })

        await Promise.all(emailPromises);
      })
    }

    return {totalActive: activeEmployees.length, onLeave: onLeaveIds.length, checkedIn: checkedInIds.length, absent: absentEmployees.length};
  }
)

export const functions = [autoCheckOut, leaveApplicationReminder, attendanceReminderCron];

