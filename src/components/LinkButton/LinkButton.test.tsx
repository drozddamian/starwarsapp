import React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom'
import LinkButton from '../LinkButton'

jest.mock('../LinkButton')

test('renders > sign if has forwarding url', () => {
  const { getByText } = render(<LinkButton linkUrl="testurl.com" />)
  expect(getByText('>')).toBeInTheDocument()
})

test('renders < sign if is goBack link', () => {
  const { getByText } = render(<LinkButton />)
  expect(getByText('<')).toBeInTheDocument()
})
