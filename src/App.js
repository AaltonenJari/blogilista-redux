import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Notification from './components/notification'
import Users from './components/Users'
import BlogList from './components/BlogList'
import Login from './components/Login'
import { initializeLogin, logout } from './reducers/loginReducer'
import {
  BrowserRouter as Router,
  Routes, Route, Link, Navigate
} from 'react-router-dom'


const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeLogin()) 
  }, [dispatch])

  const user = useSelector(state => state.login)

  const handleLogout = () => {
    dispatch(logout())
  }

  const padding = {
    padding: 5
  }

  return (
    <Router>
      <div>
        <Link style={padding} to="/">blogs</Link>
        <Link style={padding} to="/users">users</Link>
        {!user && (
          <Link style={padding} to="/login">login</Link>
        )}

        {user && (
          <span style={padding}>
            <button onClick={handleLogout}>logout</button>
          </span>
        )}
      </div>

      <Notification />

      <Routes>
        <Route path="/" element={<BlogList user={user} />} />
        <Route path="/users" element={<Users />} />
        <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
      </Routes>
    </Router>
  )
}

export default App