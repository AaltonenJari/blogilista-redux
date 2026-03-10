const Notification = ({ status, message }) => {
  if (message === null) {
    return null
  }

  if (status === 'error') {
    return (
      <div className="error">
        {message}
      </div>
    )
  }

  return (
    <div className="success">
      {message}
    </div>
  )
}

export default Notification