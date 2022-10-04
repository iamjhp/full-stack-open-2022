import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import blogService from './services/blogs'
import BlogForm from './components/BlogForm'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedInBlogUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogOut = () => {
    window.localStorage.removeItem('loggedInBlogUser')
    setUser(null)
  }

  if (user === null) {
    return (
      <div>
        <LoginForm user={user} setUser={setUser} />
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

      <h2>blogs</h2>
      <BlogForm blogs={blogs} setBlogs={setBlogs}/>
      {blogs.map(blog =>
        <Blog key={blog.id} user={user} blog={blog} />
      )}

    </div>
  )
}

export default App
