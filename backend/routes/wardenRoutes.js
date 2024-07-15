import express from "express";
import { registerWarden } from "../controllers/wardenController.js";

const router = express.Router();

router.post("/register", registerWarden);

export default router;