import React from 'react'
import { MemoryRouter } from 'react-router-dom'
import CharactersListTemplate from './template'
import { render } from '@testing-library/react'

const fakeTemplateProps = {
  isLoading: false,
  error: null,
  characters: [],
  currentPage: '1',
  howManyPagesAvailable: 5,
}

const fakeTemplatePropsWithOnePageList = {
  ...fakeTemplateProps,
  howManyPagesAvailable: 1,
}

const matchLinkUrl = /\/\/\w+\/1/

describe('Pagination container with Link items', () => {
  it('renders pagination links correctly', () => {
    const { queryByTestId, getByText } = render(
      <MemoryRouter>
        <CharactersListTemplate {...fakeTemplateProps} />
      </MemoryRouter>
    )

    expect(queryByTestId('pagination-container')).toBeTruthy()
    expect(
      queryByTestId('pagination-container')?.childElementCount
    ).toEqual(5)
    expect(
      queryByTestId('pagination-container')?.childNodes[0].textContent
    ).toBe('Page 1')
    expect(
      queryByTestId('pagination-container')?.childNodes[4].textContent
    ).toBe('Page 5')

    const uri = getByText('Page 1').closest('a')?.href ?? ''
    expect(matchLinkUrl.test(uri)).toBeTruthy()
  })

  it('render no pagination while there is only one page', () => {
    const { queryByTestId } = render(
      <MemoryRouter>
        <CharactersListTemplate {...fakeTemplatePropsWithOnePageList} />
      </MemoryRouter>
    )

    expect(queryByTestId('pagination-container')).toBeFalsy()
  })
})
