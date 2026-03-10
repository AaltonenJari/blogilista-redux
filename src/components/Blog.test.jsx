import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

test('renders content', () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'Test Author',
    url: 'http://example.com',
    likes: 5
  }

  render(<Blog blog={blog} />)

  const element = screen.getByText(/Component testing is done with react-testing-library/)
  expect(element).toBeInTheDocument()
})

test('shows url, likes and user after clicking view button', async () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'Test Author',
    url: 'http://example.com',
    likes: 5,
    user: {
      id: '123',
      name: 'Test User'
    }
  }

  const { container } = render(<Blog blog={blog} />)

  const user = userEvent.setup()
  await user.click(screen.getByText('view'))

  expect(container).toHaveTextContent('http://example.com')
  expect(container).toHaveTextContent('likes')
  expect(container).toHaveTextContent('5')
  expect(container).toHaveTextContent('Test User')
})

test('like button calls event handler twice when clicked twice', async () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'Test Author',
    url: 'http://example.com',
    likes: 5,
    user: {
      id: '123',
      name: 'Test User'
    }
  }

  const mockHandler = vi.fn()

  render(<Blog blog={blog} increaseLikes={mockHandler} />)

  const user = userEvent.setup()
  await user.click(screen.getByText('view'))
  const likeButton = screen.getByText('like')
  await user.click(likeButton)
  await user.click(likeButton)

  expect(mockHandler).toHaveBeenCalledTimes(2)
})