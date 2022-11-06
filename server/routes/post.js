import express, { Router } from "express";
import formidable from "express-formidable";
const router = express.Router();

//middleware
import {
  requireSignin,
  isAdmin,
  canCreateRead,
  canUpdateDeletePost,
  canDeleteMedia,
  canUpdateDeleteComment,
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
  postsByAuthor,
  postCount,
  postForAdmin,
  comments,
  removeComment,
  commentCount,
  createComment,
  updateComment,
  userComments,
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
// router.get("/posts", getPosts);
router.get("/posts/:page", getPosts);
router.get("/post/:slug", singlePost);
router.delete("/post/:postId", requireSignin, canUpdateDeletePost, removePost);
router.put("/edit-post/:postId", requireSignin, canUpdateDeletePost, editPost);
router.get("/post-by-author", requireSignin, canCreateRead, postsByAuthor);
router.get("/post-count", postCount);
router.get("/posts-for-admin", postForAdmin);

// media route

router.get("/media", requireSignin, canCreateRead, getMedia);
router.delete("/media/:id", requireSignin, canDeleteMedia, removeMedia);

//Comments

router.post("/comment/:postId", requireSignin, createComment);
router.get("/comments/:page", requireSignin, isAdmin, comments);
router.get("/user-comments", requireSignin, userComments);
router.get("/comment-count", commentCount);
router.delete(
  "/comment/:commentId",
  requireSignin,
  canUpdateDeleteComment,
  removeComment
);
router.put(
  "/comment/:commentId",
  requireSignin,
  canUpdateDeleteComment,
  updateComment
);
export default router;
