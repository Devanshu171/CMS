import Category from "../models/category";
import Post from "../models/post";
import slugify from "slugify";
export const create = async (req, res) => {
  try {
    const { name } = req.body;

    const data = await Category.findOne({ slug: slugify(name) });
    if (data) {
      res.json({
        error: "Category with name " + name + " already exists.",
      });
      return;
    }
    const category = await new Category({
      name,
      slug: slugify(name),
    }).save();

    console.log("saved category", category);
    res.json(category);
  } catch (err) {
    console.log(err);
  }
};

export const getCategories = async (req, res) => {
  try {
    const data = await Category.find().sort({ createdAt: -1 });
    res.json(data);
  } catch (err) {
    console.log(err);
  }
};

export const removeCategory = async (req, res) => {
  try {
    const { slug } = req.params;
    const category = await Category.findOneAndDelete({ slug });
    res.json(category);
  } catch (err) {
    console.log(err);
  }
};

export const updateCategory = async (req, res) => {
  try {
    const { slug } = req.params;
    const { name } = req.body;
    const category = await Category.findOneAndUpdate(
      { slug },
      { name, slug: slugify(name) },
      { new: true }
    );
    res.json(category);
  } catch (err) {
    console.log(err);
  }
};
export const postbyCategory = async (req, res) => {
  try {
    const { slug } = req.params;
    const category = await Category.findOne({ slug });
    console.log(category);
    const posts = await Post.find({ categories: category._id })
      .populate("featuredImage postedBy")
      .limit(20);

    res.json({ posts, category });
  } catch (err) {
    console.log(err);
  }
};
