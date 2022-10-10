import { useState, useEffect, useRef } from 'react'
import blogService from '../services/blogs'
import Togglable from './Toggleable'
import BlogForm from './BlogForm'
import ViewToggleable from './ViewToggleable'

const Blog = () => {
  const [blogs, setBlogs] = useState([])

  const blogFormRef = useRef()

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  const handleLike = (blog) => {
    const updatedBlog = {
      ...blog,
      likes: blog.likes + 1
    }

    blogService.likeBlog(blog.id, updatedBlog).then(
      setBlogs(blogs.map(b => b.id !== blog.id ? b : updatedBlog))
    )
  }

  const handleDelete = (blog) => {
    if (window.confirm(`Remove blog ${blog.title}?`)) {
      blogService.deleteBlog(blog.id).then(setBlogs(blogs.filter(b => b.id !== blog.id)))
    }
  }

  return (
    <div>
      <Togglable buttonLabel='new note' ref={blogFormRef}>
        <BlogForm blogs={blogs} setBlogs={setBlogs} blogRefs={blogFormRef}/>
      </Togglable>
      <div>
        <h2>blogs</h2>
        {blogs.sort((a, b) => b.likes - a.likes).map(blog =>
          <div key={blog.id} style={blogStyle}>
            <span>
              {blog.title} {blog.author}
            </span>
            <ViewToggleable blog={blog} handleDelete={() => handleDelete(blog)} buttonLabel='view'>
              <div>
                {blog.url}
              </div>
              <div>
                likes: {blog.likes} <button onClick={() => handleLike(blog)}>like</button>
              </div>
            </ViewToggleable>
          </div>
        )}
      </div>
    </div>

  )
}




export default Blog