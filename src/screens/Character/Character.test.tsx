import React from 'react'
import { MemoryRouter } from 'react-router-dom'
import { render } from '@testing-library/react'
import CharacterTemplate from './template'

const fakeTemplateProps = {
  films: [],
  characterName: 'Fake',
  isLoading: false,
  isFilmLoading: false,
  error: null,
  goBackDirection: '',
}

describe('Character screen template rendering', () => {
  const { getByText } = render(
    <MemoryRouter>
      <CharacterTemplate {...fakeTemplateProps} />
    </MemoryRouter>
  )

  it('renders sub header text correctly', () => {
    expect(getByText('Fake movies')).toBeTruthy()
  })
})
