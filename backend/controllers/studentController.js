import studentSchema from "../models/student.js";
import { hashPassword } from "../utils/passwordUtils.js";
import bcrypt from "bcryptjs";
import jsonwebtoken from "jsonwebtoken";

export const registerStudent = async (req, res) => {
  try {
    const {
      fullName,
      registrationNumber,
      academicYear,
      email,
      phone,
      gender,
      password,
    } = req.body;
    const hashedPassword = await hashPassword(password);
    const newStudent = new studentSchema({
      fullName,
      registrationNumber,
      academicYear,
      email,
      phone,
      gender,
      password: hashedPassword,
    });

    await newStudent.save();
    res.status(201).json({ message: "Student registered successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const loginStudent = async (req, res) => {
  try {
    studentSchema.findOne({ email: req.body.email }).then((selectedStudent) => {
      if (selectedStudent !== null) {
        bcrypt.compare(
          req.body.password,
          selectedStudent.password,
          function (err, result) {
            if (err) {
              res.status(500).json({ message: "internal server error" });
            }

            if (result) {
              const payload = {
                email: selectedStudent.email,
              };

              const secretKey = process.env.JWT_SECRET_KEY;

              const expiresIn = "24h";

              const token = jsonwebtoken.sign(payload, secretKey, {
                expiresIn,
              });

              res.status(200).json({ token: token });
            } else {
              return res.status(401).json({ message: "incorrect password" });
            }
          }
        );
      } else {
        return res.status(404).json({ error: "not found!" });
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
