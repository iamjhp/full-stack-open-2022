import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import blogService from './services/blogs'
import Togglable from './components/Toggleable'

const App = () => {
  const [user, setUser] = useState(null)


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
      <Blog />
    </div>
  )
}

export default App
