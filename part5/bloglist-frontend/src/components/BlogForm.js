import { useState } from 'react'
import InputField from './InputField'
import Notification from './Notification'

const BlogForm = ({ createBlog }) => {
  const [state, setState] = useState({
    title: '',
    author: '',
    url: '',
  })
  const [notification, setNotification] = useState(null)

  const handleOnChange = (event) => {
    const value = event.target.value

    setState({
      ...state,
      [event.target.name]: value
    })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      const newBlog = {
        ...state,
        likes: 0
      }
      createBlog(newBlog)
      setState({
        title: '',
        author: '',
        url: '',
      })
    } catch (exception) {
      notify('adding a new blog failed', 'alert')
    }
  }

  const notify = (message, type='info') => {
    setNotification({ message, type })
    setTimeout(() => {
      setNotification(null)
    }, 4000)
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <Notification notification={notification}/>
        <InputField label="title" value={state.title} name="title" onChange={handleOnChange} id={'blogName-input'}/>
        <InputField label="author" value={state.author} name="author" onChange={handleOnChange} id={'author-input'}/>
        <InputField label="url" value={state.url} name="url" onChange={handleOnChange} id={'url-input'}/>
        <button>create</button>
      </div>
    </form>
  )
}

export default BlogForm