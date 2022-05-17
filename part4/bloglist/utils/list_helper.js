const lodash = require('lodash')

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  let sumLikes = 0
  blogs.forEach(blog => {
    sumLikes += blog.likes
  })

  return sumLikes
}

const favoriteBlog = (blogs) => {
  if (blogs.length == 0) return {}

  if (blogs.length == 1) return blogs[0]

  let favBlog = blogs[0]
  for (let i = 1; i < blogs.length; i++) {
    if (favBlog.likes < blogs[i].likes) {
      favBlog = blogs[i]
    }
  }

  return favBlog
}

const mostBlogs = (blogs) => {
  if (blogs.length == 0) return {}

  countByAuthor = lodash.countBy(blogs, 'author')

  const authorWithMostBlog = Object.keys(countByAuthor).reduce((a, b) => countByAuthor[a] > countByAuthor[b] ? a : b)
  return {"author": authorWithMostBlog, "blogs": countByAuthor[authorWithMostBlog]}
}

const mostLikes = (blogs) => {
  if (blogs.length == 0) return {}
  
  let mostLikesBlog = blogs[0]
  for (let i = 1; i < blogs.length; i++) {
    if (mostLikesBlog.likes < blogs[i].likes) {
      mostLikesBlog = blogs[i]
    }
  }

  return {"author": mostLikesBlog.author, "likes": mostLikesBlog.likes}
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}