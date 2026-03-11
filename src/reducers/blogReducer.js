import { createSlice } from "@reduxjs/toolkit"
import blogService from "../services/blogs"

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    setBlogs(state, action) {
      return action.payload
    },
    createNewBlog(state, action) {
      state.push(action.payload)
    }
  }
})

const { setBlogs, createNewBlog } = blogSlice.actions

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export const appendBlog = (blog) => {
  return async dispatch => {
    const newBlog = await blogService.create(blog)
    dispatch(createNewBlog(newBlog))
  }
}

export default blogSlice.reducer