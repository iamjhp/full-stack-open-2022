import { createSlice } from "@reduxjs/toolkit"
import anecService from '../services/anecdotes'

const initialState = []

const anecSlice = createSlice ({
  name: 'anecdotes',
  initialState,
  reducers: {
    voteAnecdote(state, action) {
      const id = action.payload
      const anecdoteToChange = state.find(a => a.id === id)
      const changedAnecdote = {
        ...anecdoteToChange,
        votes: anecdoteToChange.votes + 1
      }
      anecService.updateVote(changedAnecdote.id)
      return state.map(anec => anec.id !== id ? anec : changedAnecdote)
    },
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdote(state, action) {
      return action.payload
    },
    addAnecdote(state, action) {
      const newAnecdote = action.payload
      state.push(newAnecdote)
    }
  }
})

export const initializeAnecdote = () => {
  return async dispatch => {
    const anecdotes = await anecService.getAllAnecdotes()
    dispatch(setAnecdote(anecdotes))
  }
}

export const { voteAnecdote, appendAnecdote, setAnecdote, addAnecdote } = anecSlice.actions
export default anecSlice.reducer