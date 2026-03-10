
import Notification from './notification'

const LoginForm = ({
  handleSubmit,
  handleUsernameChange,
  handlePasswordChange,
  username,
  password,
  notificationMessage
}) => {
  return (
    <div>
      <h2>Log in to application</h2>
      <Notification status="error" message={notificationMessage} />
      <form onSubmit={handleSubmit}>
        <div>
          <label>
          username
            <input
              value={username}
              onChange={handleUsernameChange}
            />
          </label>
        </div>
        <div>
          <label>
          password
            <input
              type="password"
              value={password}
              onChange={handlePasswordChange}
            />
          </label>
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  )
}

export default LoginForm