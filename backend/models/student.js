import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  registrationNumber: { type: String, required: true, unique: true },
  academicYear: { type: Number, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  gender: { type: String, required: true },
  password: { type: String, required: true },
});

export default mongoose.model("Student", studentSchema);