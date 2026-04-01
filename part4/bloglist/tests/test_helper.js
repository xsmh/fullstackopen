const Blog = require("../models/blog");

const initialBlogs = [
  {
    title: "blog1",
    author: "author1",
    url: "https://blog1",
    likes: 5,
  },
  {
    title: "blog2",
    author: "author2",
    url: "https://blog2",
    likes: 3,
  },
];

const blogsInDb = async () => {
  const blogs = await Blog.find({});
  return blogs.map((blog) => blog.toJSON());
};

module.exports = {
  initialBlogs,
  blogsInDb,
};
