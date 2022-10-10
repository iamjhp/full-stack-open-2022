import { useState } from 'react'
import InputField from './InputField'
import blogService from '../services/blogs'
import Notification from './Notification'

const BlogForm = ({ blogs, setBlogs, blogRefs }) => {
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
      const returnedBlog = await blogService.create(newBlog)
      setBlogs(blogs.concat(returnedBlog))
      notify(`a new blog ${newBlog.title} by ${newBlog.author} added`)
      blogRefs.current.toggleVisibility()
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
        <InputField label="title" value={state.title} name="title" onChange={handleOnChange}/>
        <InputField label="author" value={state.author} name="author" onChange={handleOnChange}/>
        <InputField label="url" value={state.url} name="url" onChange={handleOnChange}/>
        <button>create</button>
      </div>
    </form>
  )
}

export default BlogForm