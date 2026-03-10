import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/notification'
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'
import BlogAdditionForm from './components/BlogAdditionForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [notificationMessage, setNotificationMessage] = useState(null)
  const [notificationStatus, setNotificationStatus] = useState(null)
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
    } catch {
      const notificationMessage = 'wrong username or password'
      console.log(notificationMessage)
      setNotificationMessage(notificationMessage)
      setNotificationStatus('error')
      setTimeout(() => {
        setNotificationMessage(null)
        setNotificationStatus(null)
      }, 5000)
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
            notificationMessage={notificationMessage}
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
      setNotificationMessage(notificationMessage)
      setNotificationStatus('ok')
      setTimeout(() => {
        setNotificationMessage(null)
        setNotificationStatus(null)
      }, 5000)
    })
      .catch(error => {
        const notificationMessage = `error creating blog: ${error.response.data.error}`
        console.log(notificationMessage)
        setNotificationMessage(notificationMessage)
        setNotificationStatus('error')
        setTimeout(() => {
          setNotificationMessage(null)
          setNotificationStatus(null)
        }, 5000)
      })
  }

  const increaseLikesOf = (id) => {
    const blog = blogs.find(b => b.id === id)
    const updatedBlog = { ...blog, likes: blog.likes + 1 }

    blogService.update(id, updatedBlog)
      .then(returnedBlog => {
        setBlogs(blogs.map(n => n.id !== id ? n : returnedBlog))

        const notificationMessage = `liked blog ${returnedBlog.title} by ${returnedBlog.author}`
        setNotificationMessage(notificationMessage)
        setNotificationStatus('ok')
        setTimeout(() => {
          setNotificationMessage(null)
          setNotificationStatus(null)
        }, 5000)
      })
      .catch(error => {
        const notificationMessage = `error updating likes: ${error.response && error.response.data && error.response.data.error ? error.response.data.error : error.message}`
        console.log(notificationMessage)
        setNotificationMessage(notificationMessage)
        setNotificationStatus('error')
        setTimeout(() => {
          setNotificationMessage(null)
          setNotificationStatus(null)
        }, 5000)
      })
  }

  const deleteBlog = (id) => {
    blogService.remove(id)
      .then(() => {
        setBlogs(blogs.filter(b => b.id !== id))

        const notificationMessage = 'blog deleted'
        setNotificationMessage(notificationMessage)
        setNotificationStatus('ok')
        setTimeout(() => {
          setNotificationMessage(null)
          setNotificationStatus(null)
        }, 5000)
      })
      .catch(error => {
        const notificationMessage = `error deleting blog: ${error.response && error.response.data && error.response.data.error ? error.response.data.error : error.message}`
        console.log(notificationMessage)
        setNotificationMessage(notificationMessage)
        setNotificationStatus('error')
        setTimeout(() => {
          setNotificationMessage(null)
          setNotificationStatus(null)
        }, 5000)
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
      <Notification status={notificationStatus} message={notificationMessage} />

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