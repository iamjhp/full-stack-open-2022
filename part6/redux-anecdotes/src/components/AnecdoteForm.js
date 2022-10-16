import { useDispatch } from "react-redux"
import { addAnecdote } from "../reducers/anecdoteReducer";
import { createNotification } from "../reducers/notificationReducer";

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const createAnecdote = (event) => {
    event.preventDefault()
    const content = event.target['anecdote-content'].value
    event.target['anecdote-content'].value = ''
    dispatch(addAnecdote(content))
    dispatch(createNotification(`you created '${content}' content`))
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={createAnecdote}>
        <div><input name='anecdote-content'/></div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm