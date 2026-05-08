import { useDispatch } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'
import { appendBlog } from '../reducers/blogReducer'
import { useNavigate } from 'react-router-dom'

const BlogAdditionForm = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()


  const addBlog = async (event) => {
    event.preventDefault()

    const form = event.target.elements

    const blog = {
      title: form.title.value,
      author: form.author.value,
      url: form.url.value
    }
    try {
      await dispatch(appendBlog(blog))
      const notificationMessage = `a new blog ${blog.title} by ${blog.author} added`
      dispatch(setNotification(notificationMessage, 5))
    } catch (error) {
      const notificationMessage = `error adding blog: ${error.response && error.response.data && error.response.data.error ? error.response.data.error : error.message}`
      dispatch(setNotification(notificationMessage, 5))
    }
    navigate('/')
  }

  return (
    <div>
      <h2>Create new</h2>

      <form onSubmit={addBlog}>
        <div>
          <label htmlFor="title">title:</label>
          <input id="title" name="title" type="text" />
        </div>
        <div>
          <label htmlFor="author">author:</label>
          <input id="author" name="author" type="text" />
        </div>
        <div>
          <label htmlFor="url">url:</label>
          <input id="url" name="url" type="text" />
        </div>

        <button type="submit">create</button>
      </form>
    </div> 
 )
}

export default BlogAdditionForm