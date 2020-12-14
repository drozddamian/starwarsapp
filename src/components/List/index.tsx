import React, { ReactElement } from 'react'
import styled from 'styled-components'

const Wrapper = styled.div``

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

type Props = {
  isLoading: boolean
  error: string | null
  items: ReactElement
}

const List: React.FC<Props> = ({ isLoading, error, items }) => (
  <Wrapper>
    <Header>
      <Title>star wars viewer</Title>
    </Header>

    {items}
  </Wrapper>
)

export default List
