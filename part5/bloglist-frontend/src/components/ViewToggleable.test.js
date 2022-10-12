import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ViewToggleable from './ViewToggleable'

describe('<ViewToggleable />', () => {
  let container

  beforeEach(() => {
    container = render(
      <ViewToggleable>
        <div className="testDiv" >
          toggle content
        </div>
      </ViewToggleable>
    ).container
  })

  test('renders its children', async () => {
    await screen.findAllByText('toggle content')
  })

  test('at start the children are not displayed', () => {
    const div = container.querySelector('.viewToggleBlog')
    expect(div).toHaveStyle('display: none')
  })

  test('after clicking the button, children are displayed', async () => {
    const user = userEvent.setup()
    const button2 = screen.getByText('view')
    await user.click(button2)

    const div = container.querySelector('.viewToggleBlog')
    expect(div).not.toHaveStyle('display: none')
  })
})