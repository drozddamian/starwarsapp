import '@testing-library/jest-dom'
import React from 'react'
import { render } from '@testing-library/react'
import List from '../List'

jest.mock('../Loader')

test('List renders a Loader', () => {
  const { getByText } = render(
    <List error={null} isLoading={true} items={<></>} />
  )
  expect(getByText('Loading')).toBeInTheDocument()
})

test('Renders error message', () => {
  const { getByText } = render(
    <List error={'error'} isLoading={false} items={<></>} />
  )
  expect(getByText('error')).toBeInTheDocument()
})
