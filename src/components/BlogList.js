import { useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { updateBlogAsync, deleteBlogAsync } from '../reducers/blogReducer'
import Blog from './Blog'
import BlogAdditionForm from './BlogAdditionForm'
import Togglable from './Togglable'
import { initializeBlogs } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'

const BlogList = (user) => {
  const noteFormRef = useRef()

  const dispatch = useDispatch()

    useEffect(() => {
      dispatch(initializeBlogs()) 
    }, [dispatch])
  
    const blogList = useSelector(state => state.blogs)
  
  const BlogFormTogglable = () => (
    <Togglable buttonLabel="create new" ref={noteFormRef}>
      <BlogAdditionForm />
    </Togglable>
  )

  const increaseLikesOf = async (id) => {
    const blog = blogList.find(b => b.id === id)
    const updatedBlog = { ...blog, likes: blog.likes + 1 }

    try {
      await dispatch(updateBlogAsync(updatedBlog))
      const notificationMessage = `liked blog ${updatedBlog.title} by ${updatedBlog.author}`
      dispatch(setNotification(notificationMessage, 5))
     } catch (error) {
      const notificationMessage = `error updating likes: ${error.response && error.response.data && error.response.data.error ? error.response.data.error : error.message}`
      dispatch(setNotification(notificationMessage, 5))
    } 
  }

  const deleteBlog = async (id) => {
    try {
      await dispatch(deleteBlogAsync(id))
      const notificationMessage = 'blog deleted'
      dispatch(setNotification(notificationMessage, 5))
    } catch (error) {
      const notificationMessage = `error deleting blog: ${error.response && error.response.data && error.response.data.error ? error.response.data.error : error.message}`
      dispatch(setNotification(notificationMessage, 5))
    }
  }


  return (
    <div>
      <BlogFormTogglable />

      {[...blogList].sort((a, b) => b.likes - a.likes).map(blog =>
        <Blog
          key={blog.id}
          blog={blog}
          userid={user.id}
          increaseLikes={() => increaseLikesOf(blog.id)}
          deleteBlog={deleteBlog}
        />
      )}
    </div>
  )
}

export default BlogList