import express from "express";

const router = express.Router();

//middleware
import { requireSignin, isAdmin } from "../middlewares/index";

// controllers
import {
  create,
  getCategories,
  removeCategory,
  updateCategory,
  postbyCategory,
} from "../controllers/category";
router.post("/category", requireSignin, isAdmin, create);
router.get("/categories", getCategories);
router.delete("/category/:slug", requireSignin, isAdmin, removeCategory);
router.put("/category/:slug", requireSignin, isAdmin, updateCategory);
router.get("/posts-by-category/:slug", postbyCategory);

export default router;
