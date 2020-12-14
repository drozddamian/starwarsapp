import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import Loader from '../Loader'
import PersonListItem from './PersonListItem'
import { Person } from '../../types'
import { ROUTES } from '../../constants'

const Wrapper = styled.div`
  position: relative;
  min-height: 450px;
  height: 100%;
`

const Header = styled.div`
  background-color: gray;
  border: 1px solid black;
  padding: 10px 0 10px 50px;
`
const Title = styled.h1`
  font-size: 24px;
  color: white;
  text-transform: uppercase;
`

const ContentContainer = styled.div`
  overflow-y: scroll;
  height: 80vh;

  ::-webkit-scrollbar {
    width: 5px;
  }

  ::-webkit-scrollbar-track {
    background: #f1f1f1;
  }

  ::-webkit-scrollbar-thumb {
    background: #e93578;
  }
`

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
  items: Person[]
  isLoading: boolean
  error: string | null
  currentPage: string
  howManyPagesAvailable: number
}

const ListComponent: React.FC<Props> = ({
  items,
  isLoading,
  error,
  currentPage,
  howManyPagesAvailable,
}) => {
  const listContent = isLoading ? (
    <Loader />
  ) : (
    items.map((person) => (
      <PersonListItem
        key={person.name}
        currentPage={currentPage}
        {...person}
      />
    ))
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
    <Wrapper>
      <Header>
        <Title>star wars viewer</Title>
      </Header>

      <ContentContainer>{listContent}</ContentContainer>

      {!isLoading && (
        <PaginationContainer>{paginationLinks}</PaginationContainer>
      )}
    </Wrapper>
  )
}

export default ListComponent
