import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
  padding: 30px 0 30px 50px;
`

const FilmText = styled.h3`
  padding-bottom: 10px;
`
const DirectorText = styled.p`
  color: gray;
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
}) => {
  const filmInfoText = `${title} [${release_date}]`
  const directorText = `Director: ${director}`
  return (
    <Wrapper>
      <FilmText>{filmInfoText}</FilmText>
      <DirectorText>{directorText}</DirectorText>
    </Wrapper>
  )
}

export default FilmListItem
