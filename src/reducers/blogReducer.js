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
    },
    updateBlog(state, action) {
      const updatedBlog = action.payload
      const index = state.findIndex(b => b.id === updatedBlog.id)
      if (index !== -1) {
        state[index] = updatedBlog
      }
    },
    deleteBlog(state, action) {
      const id = action.payload
      return state.filter(b => b.id !== id)
    }
  }
})

const { setBlogs, createNewBlog, updateBlog, deleteBlog } = blogSlice.actions

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

export const updateBlogAsync = (updatedBlog) => {
  return async dispatch => {
    const returnedBlog = await blogService.update(updatedBlog.id, updatedBlog)
    dispatch(updateBlog(returnedBlog))
  }
}

export const deleteBlogAsync = (id) => {
  return async dispatch => {
    await blogService.remove(id)
    dispatch(deleteBlog(id))
  }
}

export default blogSlice.reducer