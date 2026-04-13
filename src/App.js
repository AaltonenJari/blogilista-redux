import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Notification from './components/notification'
import Users from './components/Users'
import BlogList from './components/BlogList'
import Login from './components/Login'
import { initializeLogin } from './reducers/loginReducer'

const App = () => {

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeLogin()) 
  }, [dispatch])

  const user = useSelector(state => state.login)

  if (user === null) {
    return (
      <div>
        <h2>blogs</h2>
        <Notification />
        <Login  />
      </div>
    )   
  }
  
  return (
    <div>
      <h2>blogs</h2>
      <Notification />
      <Login  />
      <BlogList user={user} />
      <Users />
    </div>
  )
}

export default App