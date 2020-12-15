import React from 'react'
import styled from 'styled-components'

import Layout from '../../components/Layout'
import List from '../../components/List'
import CharacterItem from '../../components/ListItems/CharacterItem'
import { ROUTES } from '../../constants'
import { Link } from 'react-router-dom'
import { Character } from '../../types'

const PaginationContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  padding: 10px 0 20px 0;
  margin-top: auto;
  border: 1px solid lightgray;
  border-top: none;
`

const PaginationLink = styled(Link)<{ $isActivePage: boolean }>`
  color: ${({ $isActivePage }) => ($isActivePage ? 'black' : 'gray')};
  font-size: 11px;
  padding-top: 10px;
  transition: color 0.2s ease-out;

  :not(:last-of-type) {
    margin-right: 12px;
  }

  @media (min-width: 768px) {
    :not(:last-of-type):after {
      content: '|';
      color: gray;
      margin: 0 15px;
    }
  }
  :hover {
    color: black;
  }
`

type Props = {
  characters: Character[]
  isLoading: boolean
  error: string | null
  currentPage: string
  howManyPagesAvailable: number
}

const CharactersListTemplate: React.FC<Props> = ({
  isLoading,
  error,
  characters,
  currentPage,
  howManyPagesAvailable,
}) => {
  const listItems = (
    <>
      {characters.map((character) => (
        <CharacterItem
          key={character.name}
          currentPage={currentPage}
          {...character}
        />
      ))}
    </>
  )

  const paginationLinks =
    howManyPagesAvailable > 1 &&
    [...Array(howManyPagesAvailable)].map((_, index) => {
      index++
      const linkUrl = `${ROUTES.LIST.url}${index}`
      const linkContent = `Page ${index}`
      const isActivePage = Number(currentPage) === index

      return (
        <PaginationLink
          key={index}
          to={linkUrl}
          $isActivePage={isActivePage}
        >
          {linkContent}
        </PaginationLink>
      )
    })

  return (
    <Layout>
      <List isLoading={isLoading} error={error} items={listItems} />

      {paginationLinks && (
        <PaginationContainer data-testid="pagination-container">
          {paginationLinks}
        </PaginationContainer>
      )}
    </Layout>
  )
}

export default CharactersListTemplate
