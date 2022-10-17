import { createSlice } from "@reduxjs/toolkit"

const initialState = { msg: "" }

const notificationSlice = createSlice ({
  name: 'notifications',
  initialState,
  reducers: {
    setNotification(state, action) {
      state.msg = action.payload
    },
  }
})

export const createNotification = (msg, delay=5000) => {
  return async (dispatch) => {
    dispatch(setNotification(msg))
    setTimeout(() => dispatch(setNotification("")), delay);
  }
}

export const { setNotification } = notificationSlice.actions
export default notificationSlice.reducer