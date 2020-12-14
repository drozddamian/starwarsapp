import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
  padding: 30px 0 30px 50px;
  border-bottom: 1px solid lightgray;
`

const FilmInfoContainer = styled.div`
  padding-bottom: 10px;

  h3,
  span {
    font-weight: 400;
    font-size: 20px;
  }
  h3 {
    display: inline-block;
  }
  span {
    white-space: nowrap;
  }
`

const DirectorText = styled.p`
  color: #8d9fb2;
`

type Props = {
  title: string
  release_date: string
  director: string
}
const FilmListItem: React.FC<Props> = ({
  title,
  release_date,
  director,
}) => (
  <Wrapper>
    <FilmInfoContainer>
      <h3>{title}</h3>
      <span>{` [${release_date}]`}</span>
    </FilmInfoContainer>
    <DirectorText>{`Director: ${director}`}</DirectorText>
  </Wrapper>
)

export default FilmListItem
