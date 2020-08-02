import React from 'react'
import { render, screen } from '@testing-library/react'
import App from '../App'

test('should render without crashing', () => {
  global.scrollTo = jest.fn()
  render(<App />)
  expect(screen.getByTestId('header')).toBeInTheDocument()
  expect(screen.getByTestId('main')).toBeInTheDocument()
  expect(screen.getByTestId('footer')).toBeInTheDocument()
})
