import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

test('<BlogForm /> calls onSumit and updates parent state', async () => {
  const createBlog = jest.fn()

  let component = render(<BlogForm createBlog={createBlog} />).container

  const user = userEvent.setup()
  const input = component.querySelector('#blogName-input')
  const sendButton = screen.getByText('create')

  await userEvent.type(input, 'hello world')
  await user.click(sendButton)
  
  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].title).toBe('hello world')

})