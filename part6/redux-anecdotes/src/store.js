import { configureStore } from "@reduxjs/toolkit";
import anecdoteReducer from './reducers/anecdoteReducer'
import noticationReducer from './reducers/notificationReducer'

export const store = configureStore({
  reducer: {
    anecdotes: anecdoteReducer,
    notification: noticationReducer
  }
})

