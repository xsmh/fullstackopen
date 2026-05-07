const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user");
  return response.json(blogs);
});

blogsRouter.post("/", async (request, response) => {
  const user = await User.findOne({ username: "root" });
  request.body.user = user._id;
  const blog = await new Blog(request.body);
  console.log(blog);
  const result = await blog.save();
  user.blogs = user.blogs.concat(result._id);
  await user.save();
  return response.status(201).json(result);
});

blogsRouter.delete("/:id", async (request, response) => {
  await Blog.findByIdAndDelete(request.params.id);
  response.status(204).end();
});

blogsRouter.put("/:id", async (request, response) => {
  const { likes } = request.body;
  const blog = await Blog.findById(request.params.id);
  if (!blog) {
    return response.status(404).end();
  }
  blog.likes = likes;
  const updatedBlog = await blog.save();
  return response.json(updatedBlog);
});

module.exports = blogsRouter;
