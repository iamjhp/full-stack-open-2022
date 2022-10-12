import { useRef } from 'react'
import blogService from '../services/blogs'
import Togglable from './Toggleable'
import BlogForm from './BlogForm'
import ViewToggleable from './ViewToggleable'

const Blog = ({ blogs, setBlogs, handleLike, handleLike2 }) => {

  const blogFormRef = useRef()

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
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
      <button onClick={handleLike2}>test</button>
      <div>
        <h2>blogs</h2>
        {blogs.sort((a, b) => b.likes - a.likes).map(blog =>
          <div key={blog.id} style={blogStyle}>
            <span></span>
            {blog.title} {blog.author}
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