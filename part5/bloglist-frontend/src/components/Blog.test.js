import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import Blog from './Blog'
import userEvent from '@testing-library/user-event'

describe('<Blog />', () => {
  const blog = [{
    title: 'jest',
    author: 'jest tester',
    url: 'www.jtest.dd',
    id: 1
  }]

  const mockHandler = jest.fn()

  let compontent
  beforeEach(() => {
    compontent = render(<Blog blogs={blog} setBlogs={[]} handleLike={mockHandler} />).container
  })

  test('renders blogs', async () => {
    const header = screen.getByText('blogs')
    expect(header).toBeDefined()

    const title = await screen.findByText('jest jest tester')
    expect(title).toBeDefined()

    const url = screen.queryByText('www.jtest.dd')
    expect(url).not.toBeVisible()

    const div = compontent.querySelector('.viewToggleBlog')
    expect(div).not.toBeVisible()
  })

  test('like button is clicked twice', async () => {

    const user = userEvent.setup()
    const vieButton = screen.getByText('view')
    await user.click(vieButton)
  
    const likeButton = screen.getByText('like')
    await user.click(likeButton)
    await user.click(likeButton)
  
    expect(mockHandler.mock.calls).toHaveLength(2)
  })
})

