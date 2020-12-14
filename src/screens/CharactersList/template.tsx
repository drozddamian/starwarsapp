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
  justify-content: center;
  align-items: center;
  padding: 20px 0;
  margin-top: auto;
  border: 1px solid gray;

  a {
    color: gray;
    position: relative;
    font-size: 11px;
    transition: color 0.2s ease-out;

    :hover {
      color: black;
    }

    :not(:last-of-type):after {
      content: '|';
      margin: 0 15px;
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
      const linkText = `Page ${index}`

      return (
        <Link key={index} to={linkUrl}>
          {linkText}
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
