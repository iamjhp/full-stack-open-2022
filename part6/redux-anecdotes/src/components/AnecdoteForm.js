import { useDispatch } from "react-redux"
import { addAnecdote } from "../reducers/anecdoteReducer";
import { createNotification } from "../reducers/notificationReducer";
import anecService from '../services/anecdotes'

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const createAnecdote = async (event) => {
    event.preventDefault()
    const content = event.target['anecdote-content'].value
    event.target['anecdote-content'].value = ''
    const newAnecdote = await anecService.createNewAnecdote(content)
    dispatch(addAnecdote(newAnecdote))
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