require("dotenv").config();
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import authRoutes from "./routes/auth";
import categoryRoutes from "./routes/category";
import postsRoutes from "./routes/post";
import websiteRoutes from "./routes/website";
const morgan = require("morgan");

const app = express();
const router = express.Router();
// db connection
mongoose
  .connect(process.env.DATABASE)
  .then(() => console.log("DB connected"))
  .catch((err) => console.log("DB CONNECTION ERROR: ", err));

// middlewares
app.use(express.json({ limit: "4mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan("dev"));

// route middlewares
app.use("/api", authRoutes);
app.use("/api", categoryRoutes);
app.use("/api", postsRoutes);
app.use("/api", websiteRoutes);
router.get("/test", (req, res) => {
  res.status(200).json({ ok: true });
});
app.listen(process.env.PORT || 8000, () =>
  console.log("Server running on port 8000")
);
