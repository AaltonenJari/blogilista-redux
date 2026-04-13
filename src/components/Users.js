import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux' 

import { initializeUsers } from '../reducers/userReducer'

const Users = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeUsers()) 
  }, [dispatch])
    
  const users = useSelector(state => state.users)
    
  return (
    <div>
      <h2>Users</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Blogs created</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user =>
            <tr key={user.id}>
              <td>
                {user.name}
              </td>
              <td>
                {user.blogs.length} blogs
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default Users
