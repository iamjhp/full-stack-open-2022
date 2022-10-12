import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import blogService from './services/blogs'
import Togglable from './components/Toggleable'

const App = () => {
  const [user, setUser] = useState(null)
  const [blogs, setBlogs] = useState([])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedInBlogUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }

    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  const handleLogOut = () => {
    window.localStorage.removeItem('loggedInBlogUser')
    setUser(null)
  }

  const handleLike = (blog) => {
    const updatedBlog = {
      ...blog,
      likes: blog.likes + 1
    }

    blogService.likeBlog(blog.id, updatedBlog).then(
      setBlogs(blogs.map(b => b.id !== blog.id ? b : updatedBlog))
    )
  }

  if (user === null) {
    return (
      <div>
        <Togglable buttonLabel='log in'>
          <LoginForm user={user} setUser={setUser} />
        </Togglable>
      </div>
    )
  }

  return (
    <div>
      <div>
        <p>
          {user.name} logged in
          <button onClick={handleLogOut}>log out</button>
        </p>
      </div>
      <Blog blogs={blogs} setBlogs={setBlogs} handleLike={handleLike} />
    </div>
  )
}

export default App
