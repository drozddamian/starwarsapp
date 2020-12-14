import React, { ReactElement } from 'react'
import styled from 'styled-components'
import Loader from '../Loader'

const Wrapper = styled.div`
  border: 1px solid lightgray;
`

const Error = styled.text`
  position: absolute;
  top: 50%;
  width: 100%;
  text-align: center;
`

const Header = styled.div`
  padding: 10px 0;
  text-align: center;
  background-color: gray;
  border: 1px solid black;

  @media (min-width: 767px) {
    padding: 10px 0 10px 50px;
    text-align: left;
  }
`
const Title = styled.h1`
  font-size: 24px;
  color: white;
  text-transform: uppercase;
`

const ContentContainer = styled.div`
  position: relative;
  height: 80vh;
  overflow-y: scroll;

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

type Props = {
  isLoading: boolean
  error: string | null
  items: ReactElement
}

const List: React.FC<Props> = ({ isLoading, error, items }) => {
  const renderContent = () => {
    if (error) {
      return (
        <Error>
          Something's wrong,
          <br /> please try to refresh the page.
        </Error>
      )
    }
    if (isLoading) {
      return <Loader />
    }
    return items
  }

  const listContent = renderContent()

  return (
    <Wrapper>
      <Header>
        <Title>star wars viewer</Title>
      </Header>

      <ContentContainer>{listContent}</ContentContainer>
    </Wrapper>
  )
}

export default List
