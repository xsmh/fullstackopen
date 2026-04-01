const { test, after, beforeEach } = require("node:test");
const assert = require("node:assert");
const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const helper = require("./test_helper");
const Blog = require("../models/blog");

const api = supertest(app);

beforeEach(async () => {
  await Blog.deleteMany({});
  await Blog.insertMany(helper.initialBlogs);
});

test("blogs are returned as json", async () => {
  await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);
});

test("all blogs are returned", async () => {
  const response = await api.get("/api/blogs");

  assert.strictEqual(response.body.length, 2);
});

test("unique identifier is named id", async () => {
  const response = await api.get("/api/blogs");
  const firstItem = response.body[0];
  const hasDefaultId = Object.hasOwn(firstItem, "_id");
  const hasRenamedId = Object.hasOwn(firstItem, "id");
  assert.strictEqual(hasRenamedId, true);
  assert.strictEqual(hasDefaultId, false);
});

test("a blog can be added", async () => {
  const newBlog = {
    title: "blog3",
    author: "author3",
    url: "https://blog3",
    likes: 10,
  };

  await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  const blogsAtEnd = await helper.blogsInDb();
  assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1);
});

test("a blog can be deleted", async () => {
  const blogsAtStart = await helper.blogsInDb();
  const blogToDelete = blogsAtStart[0];

  await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204);

  const blogsAtEnd = await helper.blogsInDb();
  const ids = blogsAtEnd.map((n) => n.id);
  assert(!ids.includes(blogToDelete.id));
  assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length - 1);
});

test("a blog's likes field can be updated", async () => {
  const blogsAtStart = await helper.blogsInDb();
  const blogToUpdate = blogsAtStart[0];

  await api
    .put(`/api/blogs/${blogToUpdate.id}`)
    .send({ likes: 10 })
    .expect(200);

  const blogsAtEnd = await helper.blogsInDb();
  const updatedBlogLikes = blogsAtEnd[0].likes;

  assert.strictEqual(updatedBlogLikes, 10);
});

after(async () => {
  await mongoose.connection.close();
});
