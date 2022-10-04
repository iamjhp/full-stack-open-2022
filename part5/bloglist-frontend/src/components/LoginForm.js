import {useState, useEffect} from 'react'
import loginService from '../services/login'
import blogService from '../services/blogs'
import Notification from './Notification'

const Login = (props) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [notification, setNotification] = useState(null)

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedInBlogUser', JSON.stringify(user)
      )
      
      blogService.setToken(user.token)
      props.setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      notify('user or password invalid', 'alert')
    }
  }

  const notify = (message, type='info') => {
    setNotification({ message, type})
    setTimeout(() => {
      setNotification(null)
    }, 4000)
  }
 
  const loginForm = () => (
    <div>
    <Notification notification={notification}/>
      <form onSubmit={handleLogin}>
        <div>
          username
            <input 
              type="text"
              value={username}
              name="Username"
              onChange={({target}) => setUsername(target.value)}
            />
        </div>
        <div>
          password
          <input
            type="text"
            value={password}
            name="Password"
            onChange={({target}) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  )

  return (
    <div>
      <h2>log in to application</h2>

      {loginForm()
      }
    </div>
  )
}

export default Login