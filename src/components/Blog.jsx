import { useNavigate, useParams } from 'react-router-dom'

const Blog = ({ blogs, userid, increaseLikes, deleteBlog }) => {
  const id = useParams().id
  const blog = blogs.find(b => b.id === id)

  const navigate = useNavigate()

  if (!blog) return null

  const handleDelete = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      deleteBlog(blog.id)
      navigate('/')
    }
  }

  const deleteButtonVisible = { display: blog.user && blog.user.id === userid ? '' : 'none' }

  return (
    <div data-testid={`blog-${blog.id}`}>
      <h1>{blog.author}: {blog.title}</h1>
      <a href={blog.url} target="_blank" rel="noopener noreferrer">{blog.url}</a>
      <div>
        <span data-testid={`likes-${blog.id}`}>likes {blog.likes}</span>
        <span style={deleteButtonVisible}>
          <button onClick={() => increaseLikes(blog.id)} data-testid={`like-${blog.id}`}>like</button>
        </span>
      </div>
      <span>Added by {blog.user.name}</span>
      <div style={deleteButtonVisible}>
        <button onClick={handleDelete}>
          remove
        </button>
      </div>
    </div>
  )
}

export default Blog