import { createSlice } from "@reduxjs/toolkit"

const notificationSlice = createSlice({
  name: 'notification',
  initialState: null,
  reducers: {
    setNotification(state, action) {
      return action.payload
    },
    clearNotification() {
      return null
    }   
  }
})

let timeoutId = null

export const setNotification = (message, time) => {
  return dispatch => {
    dispatch(notificationSlice.actions.setNotification(message))
    if (timeoutId) {
      clearTimeout(timeoutId)
    }
    timeoutId = setTimeout(() => {
      dispatch(notificationSlice.actions.clearNotification())
    }, time * 1000)
  }
}

export default notificationSlice.reducer