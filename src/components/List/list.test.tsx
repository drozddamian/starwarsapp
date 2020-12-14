import React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom'
import List from './index'

jest.mock('../Loader')

test('List renders a Loader', () => {
  const { getByText } = render(<List error={null} isLoading={true} items={<></>} />);
  expect(getByText('Loading')).toBeInTheDocument()
});

test('Renders error message', async () => {
  const { getByText } = render(<List error={'error'} isLoading={false} items={<></>} />)
  expect(getByText('error')).toBeInTheDocument()
})