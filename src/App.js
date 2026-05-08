import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Notification from './components/notification'
import Users from './components/Users'
import BlogList from './components/BlogList'
import Login from './components/Login'
import { initializeLogin, logout } from './reducers/loginReducer'
import {
  Routes, Route, Link, Navigate,
  useMatch
} from 'react-router-dom'
import { updateBlogAsync, deleteBlogAsync } from './reducers/blogReducer'
import { setNotification } from './reducers/notificationReducer'
import Blog from './components/Blog'
import { initializeBlogs } from './reducers/blogReducer'
import BlogAdditionForm from './components/BlogAdditionForm'

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeLogin())
  }, [dispatch])

  const user = useSelector(state => state.login)

  useEffect(() => {
    dispatch(initializeBlogs()) 
  }, [dispatch])

  const blogList = useSelector(state => state.blogs)

  const handleLogout = () => {
    dispatch(logout())
  }

  const padding = {
    padding: 5
  }

  const increaseLikesOf = async (id) => {
    const blog = blogList.find(b => b.id === id)

    if (!blog) return

    const updatedBlog = { ...blog, likes: blog.likes + 1 }

    try {
      await dispatch(updateBlogAsync(updatedBlog))
      dispatch(setNotification(`liked blog ${updatedBlog.title} by ${updatedBlog.author}`, 5))
    } catch (error) {
      dispatch(setNotification(`error updating likes: ${error.message}`, 5))
    }
  }

  const deleteBlog = async (id) => {
    try {
      await dispatch(deleteBlogAsync(id))
      dispatch(setNotification('blog deleted', 5))
    } catch (error) {
      dispatch(setNotification(`error deleting blog: ${error.message}`, 5))
    }
  }

  const match = useMatch('/blogs/:id')
  const blog = match
    ? blogList.find(b => b.id === match.params.id)
    : null

  return (
    <div>
      <div>
        <Link style={padding} to="/">blogs</Link>
        <Link style={padding} to="/new">new blog</Link>
        <Link style={padding} to="/users">users</Link>

        {!user && <Link style={padding} to="/login">login</Link>}

        {user && (
          <span style={padding}>
            <button onClick={handleLogout}>logout</button>
          </span>
        )}
      </div>

      <Notification />

      <Routes>
        <Route
          path="/blogs/:id"
          element={
            <Blog
              blog={blog}
              userid={user?.id}
              increaseLikes={increaseLikesOf}
              deleteBlog={deleteBlog}
            />
          }
        />
        <Route path="/" element={<BlogList blogList={blogList} />} />
        <Route path="/users" element={<Users />} />
        <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
        <Route path="/new" element={user ? <BlogAdditionForm /> : <Navigate to="/login" />} />
      </Routes>
    </div>
  )
}

export default App