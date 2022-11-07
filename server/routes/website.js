import express from "express";

const router = express.Router();
import { requireSignin } from "../middlewares/index";
import { contact } from "../controllers/contact";
router.post("/contact", contact);

export default router;
