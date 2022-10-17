//import { useDispatch } from "react-redux"
import { addAnecdote } from "../reducers/anecdoteReducer";
import { setNotification } from "../reducers/notificationReducer";
import anecService from '../services/anecdotes'
import { connect } from "react-redux";

const AnecdoteForm = (props) => {
  //const dispatch = useDispatch();

  const createAnecdote = async (event) => {
    event.preventDefault()
    const content = event.target['anecdote-content'].value
    event.target['anecdote-content'].value = ''
    const newAnecdote = await anecService.createNewAnecdote(content)
    //dispatch(addAnecdote(newAnecdote))
    //dispatch(setNotification(`you created '${content}' content`, 5))
    props.addAnecdote(newAnecdote)
    props.setNotification(`you created '${content}' content`, 5)
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

const mapDispatchToProps = {
  addAnecdote,
  setNotification
}

export default connect(null, mapDispatchToProps)(AnecdoteForm)