import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Notification from './components/Notification'
import anecService from './services/anecdotes'
import { setAnecdote } from './reducers/anecdoteReducer'

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    anecService.getAllAnecdotes()
      .then(anec => dispatch(setAnecdote(anec)))
  }, [dispatch])

  return (
    <div>
      <h2>Anecdotes</h2>
      <Notification />
      <AnecdoteForm />
      <AnecdoteList />
    </div>
  )
}

export default App