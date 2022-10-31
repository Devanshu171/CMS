import express from "express";
import formidable from "express-formidable";
const router = express.Router();

//middleware
import {
  requireSignin,
  isAdmin,
  canCreateRead,
  canUpdateDeletePost,
  canDeleteMedia,
} from "../middlewares/index";

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
router.post("/upload-image", requireSignin, canCreateRead, uploadImage);
router.post(
  "/upload-image-file",
  formidable(),
  requireSignin,
  canCreateRead,
  uploadImageFile
);
router.post("/create-post", requireSignin, canCreateRead, createPost);
router.get("/posts", getPosts);
router.get("/post/:slug", singlePost);
router.delete("/post/:postId", requireSignin, canUpdateDeletePost, removePost);
router.put("/edit-post/:postId", requireSignin, canUpdateDeletePost, editPost);

// media route

router.get("/media", requireSignin, canCreateRead, getMedia);
router.delete("/media/:id", requireSignin, canDeleteMedia, removeMedia);

export default router;
