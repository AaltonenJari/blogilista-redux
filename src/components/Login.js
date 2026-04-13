import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Togglable from './Togglable'
import LoginForm from './LoginForm'
import { initializeLogin, login, logout } from '../reducers/loginReducer'
import { setNotification } from '../reducers/notificationReducer'

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeLogin()) 
  }, [dispatch])

  const user = useSelector(state => state.login)

  const handleLogin = async event => {
    event.preventDefault()
    try {
      const user = await dispatch(login(username, password))
      setUsername('')
      setPassword('')
      const notificationMessage = 'welcome back ' + user.name
      dispatch(setNotification(notificationMessage, 5))
    } catch {
      setUsername('')
      setPassword('')
      const notificationMessage = 'wrong username or password'
      dispatch(setNotification(notificationMessage, 5))
    }
  }

  const handleLogout = () => {
    dispatch(logout())
    setUsername('')
    setPassword('')
  }

  if (user === null) {
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

  return (
    <div>
      <form onSubmit={handleLogout}>
          <p>
            {user.name} logged in
          </p>
          <p>
            <button type="submit">logout</button>
          </p>
        </form>

    </div>
  )
}

export default Login