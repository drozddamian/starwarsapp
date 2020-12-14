import React from 'react'
import styled from 'styled-components'

import Layout from '../../components/Layout'
import List from '../../components/List'
import CharacterItem from '../../components/List/CharacterItem'
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

  a {
    color: gray;
    font-size: 11px;
    padding-top: 10px;
    transition: color 0.2s ease-out;

    :not(:last-of-type) {
      margin-right: 12px;
    }

    @media (min-width: 768px) {
      :not(:last-of-type):after {
        content: '|';
        margin: 0 15px;
      }
    }
    :hover {
      color: black;
    }
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

  const paginationLinks = [...Array(howManyPagesAvailable)].map(
    (_, index) => {
      index++
      const linkUrl = `${ROUTES.LIST.url}${index}`
      const linkContent = `Page ${index}`

      return (
        <Link key={index} to={linkUrl}>
          {linkContent}
        </Link>
      )
    }
  )

  return (
    <Layout>
      <List isLoading={isLoading} error={error} items={listItems} />

      {paginationLinks && (
        <PaginationContainer>{paginationLinks}</PaginationContainer>
      )}
    </Layout>
  )
}

export default CharactersListTemplate
