import { render, screen } from '@testing-library/react'
import BlogAdditionForm from './BlogAdditionForm'
import userEvent from '@testing-library/user-event'

test('calls createBlog with correct details when a new blog is added', async () => {
  const createBlog = vi.fn()

  render(<BlogAdditionForm createBlog={createBlog} />)

  const user = userEvent.setup()

  const titleInput = screen.getByLabelText('title:')
  const authorInput = screen.getByLabelText('author:')
  const urlInput = screen.getByLabelText('url:')
  const createButton = screen.getByText('create')

  await user.type(titleInput, 'Testing React Forms')
  await user.type(authorInput, 'Test Author')
  await user.type(urlInput, 'http://example.com')
  await user.click(createButton)

  expect(createBlog).toHaveBeenCalledTimes(1)
  expect(createBlog).toHaveBeenCalledWith({
    title: 'Testing React Forms',
    author: 'Test Author',
    url: 'http://example.com'
  })
})