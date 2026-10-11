import Employee from "../models/Employee.js"
import bcrypt from "bcrypt"
import User from "../models/User.js"

// Get Employees
// GET /api/employees
export const getEmployees = async(req, res) => {
  try{
    const {department} = req.query;
    const where = {};

    if(department){
      where.department = department;
    }

    const employees = await Employee.find(where)
      .sort({createdAt: -1})
      .populate("userId", "email role")
      .lean();

    const result = employees.map((emp) => ({
      ...emp,
      id: emp._id.toString(),
      user: emp.userId ? {email: emp.userId.email, role: emp.userId.role} : null
    }))

    return res.json(result);
  }catch(error){
    return res.status(500).json({error: "Failed to fetch employees"});
  }
}

// Create Employee
// POST /api/employees
export const createEmployee = async(req, res) => {
  let createdUser = null;
  try{
    const {firstName, lastName, email, phone, position, department, basicSalary, allowances, deductions, joinDate, password, role, bio} = req.body;

    if(!email || !password || !firstName || !lastName || !phone || !position || !joinDate){
      return res.status(400).json({error: "Missing required fields"});
    }

    const parsedJoinDate = new Date(joinDate);

    if(Number.isNaN(parsedJoinDate.getTime())){
      return res.status(400).json({error: "Invalid join date"});
    }

    const hashed = await bcrypt.hash(password, 10);
    createdUser = await User.create({
      email, 
      password: hashed,
      role: role || "EMPLOYEE"
    })

    const employee = await Employee.create({
      userId: createdUser._id,
      firstName,
      lastName,
      email,
      phone,
      position,
      department: department || "Engineering",
      basicSalary: Number(basicSalary) || 0,
      allowances: Number(allowances) || 0,
      deductions: Number(deductions) || 0,
      joinDate: parsedJoinDate,
      bio: bio || "",
    })

    return res.status(201).json({success: true, employee});
  }catch(error){
    // Clean up created user if employee creation failed to prevent orphaned records
    if(createdUser?._id){
      await User.findByIdAndDelete(createdUser._id).catch(() => {});
    }

    if(error.code === 11000){
      return res.status(400).json({error: "Email already exists"});
    }

    console.error("Create employee error: ", error);

    return res.status(500).json({error: "Failed to create employee"});
  }
}

// Update employee
// PUT /api/employees/:id
export const updateEmployee = async(req, res) => {
  try{
    const {id} = req.params;
    const {firstName, lastName, email, phone, position, department, basicSalary, allowances, deductions, password, role, bio, employmentStatus} = req.body;

    const employee = await Employee.findById(id);

    if(!employee){
      return res.status(404).json({error: "Employee not found"})
    }

    // Verify email conflict before modifying
    if(email && email !== employee.email){
      const existingUser = await User.findOne({email, _id: {$ne: employee.userId}});
      if(existingUser){
        return res.status(400).json({error: "Email already exists"});
      }
    }

    await Employee.findByIdAndUpdate(id, {
      firstName,
      lastName,
      email,
      phone,
      position,
      department: department || "Engineering",
      basicSalary: Number(basicSalary) || 0,
      allowances: Number(allowances) || 0,
      deductions: Number(deductions) || 0,
      bio: bio || "",
      employmentStatus: employmentStatus || "ACTIVE"
    })

    const userUpdate = {email}

    if(role){
      userUpdate.role = role;
    }

    if(password){
      userUpdate.password = await bcrypt.hash(password, 10);
    }

    await User.findByIdAndUpdate(employee.userId, userUpdate);

    return res.json({success: true});
  }catch(error){
    if(error.code === 11000){
      return res.status(400).json({error: "Email already exists"});
    }

    return res.status(500).json({error: "Failed to update employee"});
  }
}

// Delete Employee
// DELETE /api/employees/:id
export const deleteEmployee = async(req, res) => {
  try{
    const {id} = req.params;

    const employee = await Employee.findById(id);

    if(!employee){
      return res.status(404).json({error: "Employee not found"});
    }

    employee.isDeleted = true;
    employee.employmentStatus = "INACTIVE";

    await employee.save();

    return res.json({success: true});
  }catch(error){
    return res.status(500).json({error: "Failed to delete employee"});
  }
}
