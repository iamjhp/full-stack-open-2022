const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')

describe('when there is initially some blogs saved', () => {
  beforeEach(async () => {
    await Blog.deleteMany({})
  
    const blogObjects = helper.initialBlogs.map(blog => new Blog(blog))
    const promiseArray = blogObjects.map(blog => blog.save())
    await Promise.all(promiseArray) 
  })

  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')
    
    expect(response.body).toHaveLength(helper.initialBlogs.length)
  })

  test('a specific blog is within the returned blogs', async () => {
    const response = await api.get('/api/blogs')
    const titles = response.body.map(r => r.title)
  
    expect(titles).toContain('test 2')
  })
})

describe('viewing a specific blog', () => {
  test('a specific blog can be viewed', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToView = blogsAtStart[1]
  
    const resultBlog = await api
      .get(`/api/blogs/${blogToView["id"]}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)
    
    const processedBlogToView = JSON.parse(JSON.stringify(blogToView))
  
    expect(resultBlog.body).toEqual(processedBlogToView)
  })

  test('fails with statuscode 404 if blog does not exist', async () => {
    const validNonExistingId = await helper.nonExistingId()

    await api
      .get(`/api/blogs/${validNonExistingId}`)
      .expect(404)
  })

  test('unique identifier id is defined', async () => {
    const response = await api.get('/api/blogs')
  
    expect(response.body[0]["id"]).toBeDefined()
  
  })
})

describe('additional of a new blog', () => {
  test('a valid blog can be added', async () => {
    const userAtStart = await helper.usersInDb()
    const userId = userAtStart[0].id

    const newBlog = {
      title: "test 3",
      author: "author 3",
      url: "www.test3.com",
      likes: 3,
      userId: userId
    }
  
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)
  
  
  
    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
  
    const titles = blogsAtEnd.map(b => b.title)
    expect(titles).toContain('test 3')
  })

  test('blog without title is not added', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const userAtStart = await helper.usersInDb()
    const userId = userAtStart[0].id

    const newBlog = {
      author: "author 3",
      url: "www.test3.com",
      likes: 11,
      userId: userId
    }
  
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)
  
    const blogsAtEnd = await helper.blogsInDb()
  
    expect(blogsAtEnd).toHaveLength(blogsAtStart.length)
  })

  test('likes is 0 by default if it is not defined', async () => {
    const userAtStart = await helper.usersInDb()
    const userId = userAtStart[0].id

    const newBlog = {
      title: "likes 0",
      author: "likes test",
      url: "www.likes0.com",
      userId: userId
    }
  
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)
    
    const blogsAtEnd = await helper.blogsInDb()
    const blog = blogsAtEnd.find(b => b.title == "likes 0")
  
    expect(blog.likes).toEqual(0)
  })
})

describe('deletion of a blog', () => {
  test('a blog can be deleted', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(blogsAtStart.length - 1)

    const titles = blogsAtEnd.map(b => b.title)
    expect(titles).not.toContain(blogToDelete.title)
  })
})

describe('updating likes of a blog', () => {
  test('likes of a blog can be updated', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToUpdate = blogsAtStart[0]

    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send({
        likes: 7
      })
      .expect(200)

    const blogsAtEnd = await helper.blogsInDb()
    const updatedBlog = blogsAtEnd[0]

    expect(blogsAtEnd).toHaveLength(blogsAtStart.length)
    expect(updatedBlog.likes).toBe(7)
  })
})

afterAll(() => {
  mongoose.connection.close()
})
