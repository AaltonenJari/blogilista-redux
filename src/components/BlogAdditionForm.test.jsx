import { render, screen } from '@testing-library/react'
import { vi } from 'vitest'
import BlogAdditionForm from './BlogAdditionForm'
import userEvent from '@testing-library/user-event'
import { Provider } from 'react-redux'
import { MemoryRouter } from 'react-router-dom'
import store from '../store'

import * as blogReducer from '../reducers/blogReducer'

test('calls createBlog with correct details when a new blog is added', async () => {
  const appendBlogSpy = vi.spyOn(blogReducer, 'appendBlog')

  render(
    <Provider store={store}>
      <MemoryRouter>
        <BlogAdditionForm />
      </MemoryRouter>
    </Provider>
  )

  const titleInput = screen.getByLabelText('title:')
  const authorInput = screen.getByLabelText('author:')
  const urlInput = screen.getByLabelText('url:')
  const createButton = screen.getByText('create')

  await userEvent.type(titleInput, 'Testing React Forms')
  await userEvent.type(authorInput, 'Test Author')
  await userEvent.type(urlInput, 'http://example.com')
  await userEvent.click(createButton)
 
  expect(appendBlogSpy).toHaveBeenCalledTimes(1)
  expect(appendBlogSpy).toHaveBeenCalledWith({
    title: 'Testing React Forms',
    author: 'Test Author',
    url: 'http://example.com'
  })
})