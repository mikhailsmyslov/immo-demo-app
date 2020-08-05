import React from 'react'
import {
  render,
  screen,
  waitForElementToBeRemoved,
  queryByTestId
} from '@testing-library/react'
import App from '../App'

test('should render without crashing', async () => {
  document.body.scrollTo = jest.fn()
  render(<App />)
  expect(screen.getByTestId('header')).toBeInTheDocument()
  expect(screen.getByTestId('screenSaver')).toBeInTheDocument()
  expect(screen.getByTestId('footer')).toBeInTheDocument()
  await waitForElementToBeRemoved(() => screen.queryByTestId('screenSaver'))
  expect(screen.getByTestId('main')).toBeInTheDocument()
})
