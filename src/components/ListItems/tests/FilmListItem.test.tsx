import React from 'react'
import { render } from '@testing-library/react'
import FilmListItem from '../FilmListItem'

const fakeProps = {
  title: 'A New Hope',
  release_date: '1977-05-25',
  director: 'George Lucas',
}

test('renders director text correctly in film item component', () => {
  const { getByText } = render(<FilmListItem {...fakeProps} />)
  expect(getByText('Director: George Lucas')).toBeTruthy()
})
