import { useDispatch } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'
import { appendBlog } from '../reducers/blogReducer'

const BlogAdditionForm = () => {
  const dispatch = useDispatch()

  const addBlog = async (event) => {
    event.preventDefault()
    const blog = {
      title: event.target.title.value,
      author: event.target.author.value,
      url: event.target.url.value
    }
    try {
      dispatch(appendBlog(blog))
      dispatch(setNotification(`a new blog ${blog.title} by ${blog.author} added`, 5))
    } catch (error) {
      dispatch(setNotification('error adding blog', 5))
    }
  }

  return (
    <div>
      <h2>Create new</h2>
      <form onSubmit={addBlog}>
        <div>
          <label htmlFor="title">title:</label>
          <input id="title" type="text" />
        </div>
        <div>
          <label htmlFor="author">author:</label>
          <input id="author" type="text" />
        </div>
        <div>
          <label htmlFor="url">url:</label>
          <input id="url" type="text" />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default BlogAdditionForm