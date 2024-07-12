import mongoose from "mongoose";

const wardenSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  wardenRegNumber: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  gender: { type: String, required: true },
  password: { type: String, required: true },
});

export default mongoose.model("Warden", wardenSchema);