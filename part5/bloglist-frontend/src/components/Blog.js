import { useState, useEffect } from "react"
import blogService from '../services/blogs'
import Togglable from "./Toggleable"
import BlogForm from "./BlogForm"

const Blog = ({blog}) => {
  const [blogs, setBlogs] = useState([])

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  return (
    <div>
      <Togglable buttonLabel='new note'>
        <BlogForm blogs={blogs} setBlogs={setBlogs}/>
      </Togglable>
      <div>
        <h2>blogs</h2>
        {blogs.map(blog => 
          <p>
            {blog.title} {blog.author} <button>view</button>
          </p>
        )}
      </div>
    </div>

  )
}




export default Blog