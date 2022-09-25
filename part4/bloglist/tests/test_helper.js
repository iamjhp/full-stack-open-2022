const Blog = require('../models/blog')

const initialBlogs = [
  {
    title: "test 1",
    author: "author 1",
    url: "www.test1.com",
    likes: 1
  },
  {
    title: "test 2",
    author: "author 2",
    url: "www.test2.com",
    likes: 2
  }
]

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const nonExistingId = async () => {
  const blog = new Blog({
    title: "delete Blog",
    author: "deleter",
    url: "www.delete.com",
    liked: 15
  })

  await blog.save()
  await blog.remove()

  return blog._id.toString()
}

module.exports = {
  initialBlogs, blogsInDb, nonExistingId
}