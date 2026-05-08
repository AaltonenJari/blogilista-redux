import { useNavigate } from 'react-router-dom'

const Blog = ({ blog, userid, increaseLikes, deleteBlog }) => {
  const navigate = useNavigate()

  if (!blog) return null

  const handleDelete = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      deleteBlog(blog.id)
      navigate('/')
    }
  }

  return (
    <div data-testid={`blog-${blog.id}`}>
      <h1>{blog.author}: {blog.title}</h1>
      <a href={blog.url} target="_blank" rel="noopener noreferrer">{blog.url}</a>

      <div>
        <span data-testid={`likes-${blog.id}`}>likes {blog.likes}</span>
        <span>
          {userid && (
            <button onClick={() => increaseLikes(blog.id)} data-testid={`like-button-${blog.id}`}>like</button>
          )}
        </span>
      </div>
      <span>Added by {blog.user.name}</span>
      <div>
        {blog.user && blog.user.id === userid && (
          <button onClick={handleDelete} data-testid={`delete-button-${blog.id}`}>remove</button>
        )}
      </div>
    </div>
  )
}

export default Blog