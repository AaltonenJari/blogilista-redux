import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/notification'
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'
import BlogAdditionForm from './components/BlogAdditionForm'
import { useDispatch } from 'react-redux'
import { setNotification } from './reducers/notificationReducer'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const noteFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const dispatch = useDispatch()

  const handleLogin = async event => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password })

      window.localStorage.setItem(
        'loggedNoteappUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      const notificationMessage = 'welcome back ' + user.name
      dispatch(setNotification(notificationMessage, 5))
    } catch {
      const notificationMessage = 'wrong username or password'
      dispatch(setNotification(notificationMessage, 5))
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedNoteappUser')
    setUser(null)
    setUsername('')
    setPassword('')
  }

  const loginForm = () => {

    return (
      <div>
        <Togglable buttonLabel='login'>
          <LoginForm
            username={username}
            password={password}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
            handleSubmit={handleLogin}
          />
        </Togglable>
      </div>
    )
  }

  const addBlog = (blogObject) => {
    noteFormRef.current.toggleVisibility()

    blogService.create(blogObject).then(returnedBlog => {
      setBlogs(blogs.concat(returnedBlog))

      const notificationMessage = `a new blog ${returnedBlog.title} by ${returnedBlog.author} added`
      dispatch(setNotification(notificationMessage, 5))
    })
    .catch(error => {
      const notificationMessage = `error creating blog: ${error.response.data.error}`
      dispatch(setNotification(notificationMessage, 5))
    })
  }

  const increaseLikesOf = (id) => {
    const blog = blogs.find(b => b.id === id)
    const updatedBlog = { ...blog, likes: blog.likes + 1 }

    blogService.update(id, updatedBlog)
      .then(returnedBlog => {
        setBlogs(blogs.map(n => n.id !== id ? n : returnedBlog))

        const notificationMessage = `liked blog ${returnedBlog.title} by ${returnedBlog.author}`
        dispatch(setNotification(notificationMessage, 5))
      })
      .catch(error => {
        const notificationMessage = `error updating likes: ${error.response && error.response.data && error.response.data.error ? error.response.data.error : error.message}`
        dispatch(setNotification(notificationMessage, 5))
      })
  }

  const deleteBlog = (id) => {
    blogService.remove(id)
      .then(() => {
        setBlogs(blogs.filter(b => b.id !== id))

        const notificationMessage = 'blog deleted'
        dispatch(setNotification(notificationMessage, 5))
      })
      .catch(error => {
        const notificationMessage = `error deleting blog: ${error.response && error.response.data && error.response.data.error ? error.response.data.error : error.message}`
        dispatch(setNotification(notificationMessage, 5))
      })
  }

  if (user === null) {
    return (
      <div>
        {loginForm()}
      </div>
    )
  }

  const BlogFormTogglable = () => (
    <Togglable buttonLabel="create new blog" ref={noteFormRef}>
      <BlogAdditionForm createBlog={addBlog} />
    </Togglable>
  )


  return (
    <div>
      <h2>blogs</h2>
      <Notification />

      <form onSubmit={handleLogout}>
        <p>
          {user.name} logged in
          <button type="submit">logout</button>
        </p>
      </form>

      <BlogFormTogglable />

      blogs sorted by likes
      <br /><br />
      {[...blogs].sort((a, b) => b.likes - a.likes).map(blog =>
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

export default App