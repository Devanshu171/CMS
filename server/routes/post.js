import express from "express";
import formidable from "express-formidable";
const router = express.Router();

//middleware
import { requireSignin, isAdmin } from "../middlewares/index";

// controllers
import {
  uploadImage,
  createPost,
  getPosts,
  uploadImageFile,
  getMedia,
  removeMedia,
  singlePost,
  removePost,
  editPost,
} from "../controllers/post";
router.post("/upload-image", requireSignin, isAdmin, uploadImage);
router.post(
  "/upload-image-file",
  formidable(),
  requireSignin,
  isAdmin,
  uploadImageFile
);
router.post("/create-post", requireSignin, isAdmin, createPost);
router.get("/posts", getPosts);
router.get("/post/:slug", singlePost);
router.delete("/post/:postId", requireSignin, isAdmin, removePost);
router.put("/edit-post/:postId", requireSignin, isAdmin, editPost);

// media route

router.get("/media", requireSignin, isAdmin, getMedia);
router.delete("/media/:id", requireSignin, isAdmin, removeMedia);

export default router;
