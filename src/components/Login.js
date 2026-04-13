import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import LoginForm from './LoginForm'
import { initializeLogin, login } from '../reducers/loginReducer'
import { setNotification } from '../reducers/notificationReducer'

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeLogin()) 
  }, [dispatch])

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

    return (
      <div>
          <LoginForm
            username={username}
            password={password}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
            handleSubmit={handleLogin}
          />
      </div>
    )   
}

export default Login