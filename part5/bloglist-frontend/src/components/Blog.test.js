import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import Blog from './Blog'

test('renders blogs', async () => {
  const blog = [{
    title: 'jest',
    author: 'jest tester',
    url: 'www.jtest.dd',
    id: 1
  }]

  const container = render(<Blog blogs={blog} />)

  const header = screen.getByText('blogs')
  expect(header).toBeDefined()

  const title = await screen.findByText('jest jest tester')
  expect(title).toBeDefined()

  const url = screen.queryByText('www.jtest.dd')
  expect(url).not.toBeVisible()

  const div = container.container.querySelector('.viewToggleBlog')
  expect(div).not.toBeVisible()
})

