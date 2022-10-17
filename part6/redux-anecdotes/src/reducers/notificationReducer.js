import { createSlice } from "@reduxjs/toolkit"

const initialState = { msg: "" }

const notificationSlice = createSlice ({
  name: 'notifications',
  initialState,
  reducers: {
    notify(state, action) {
      state.msg = action.payload
    },
    reset(state, action) {
      return initialState;
    }
  }
})

let lastTimeout = null;

export const setNotification = (msg, delay=5) => {
  return async (dispatch) => {
    dispatch(notify(msg))
    if (lastTimeout) clearTimeout(lastTimeout)
    
    lastTimeout = setTimeout(() => dispatch(reset()), delay * 1000);
  }
}

export const { notify, reset } = notificationSlice.actions
export default notificationSlice.reducer