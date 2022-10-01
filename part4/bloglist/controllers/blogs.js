const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

/*
const getTokenForm = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7)
  }

  return null
}
*/

blogsRouter.get('/', async (request, response) => {
  /*
  Blog
    .find({})
    .then(blogs => {
      response.json(blogs)
    })
  */
  const blogs = await Blog
    .find({}).populate('user', {username: 1, name: 1})

  response.json(blogs)
})

blogsRouter.get('/:id', async (request, response, next) => {
  const blog = await Blog.findById(request.params.id)
  if (blog){
    response.json(blog)
  } else {
    response.status(404).end()
  }
})

blogsRouter.post('/', async (request, response, next) => {
  const body = request.body
  //const token = getTokenForm(request)
  try {
    const decodedToken = jwt.verify(request.token, process.env.SECRECT)
    if (!decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid'})
    }
    
    const user = request.user

    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes,
      user: user._id
    })

  
    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()

    response.status(201).json(savedBlog)
  } catch(exception) {
    next(exception)
  }
})

blogsRouter.delete('/:id', async (request, response) => {
  const decodedToken = jwt.verify(request.token, process.env.SECRECT)

  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid'})
  }

  const blog = await Blog.findById(request.params.id)
  const user = request.user

  if (blog.user.toString() === user._id.toString()) {
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
  } else {
    response.status(401).json({ error: 'You are not the authorized to delete this blog'})
  }

  
})

blogsRouter.put('/:id', async (request, response, next) => {
  const body = request.body

  const blog = {
    likes: body.likes
  }

  try{
    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {new: true})
    response.json(updatedBlog)
  } catch(exception) {
    next(exception)
  }
})



module.exports = blogsRouter