import Student from "../models/student.js";
import { hashPassword } from "../utils/passwordUtils.js";

export const registerStudent = async (req, res) => {
  try {
    const { fullName, registrationNumber, academicYear, email, phone, gender, password } = req.body;
    const hashedPassword = await hashPassword(password);
    const newStudent = new Student({ fullName, registrationNumber, academicYear, email, phone, gender, password: hashedPassword });

    await newStudent.save();
    res.status(201).json({ message: "Student registered successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};