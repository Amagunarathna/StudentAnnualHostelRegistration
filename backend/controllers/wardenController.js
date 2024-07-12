import Warden from "../models/warden.js";
import { hashPassword } from "../utils/passwordUtils.js";

export const registerWarden = async (req, res) => {
  try {
    const { fullName, wardenRegNumber, email, phone, gender, password } = req.body;
    const hashedPassword = await hashPassword(password);
    const newWarden = new Warden({ fullName, wardenRegNumber, email, phone, gender, password: hashedPassword });

    await newWarden.save();
    res.status(201).json({ message: "Warden registered successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};