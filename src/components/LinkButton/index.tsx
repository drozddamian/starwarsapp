import React from 'react'
import styled from 'styled-components'
import { Link, useHistory } from 'react-router-dom'

export const LinkButtonContainer = styled.div`
  background-color: #e93578;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;

  a {
    color: white;
    padding: 10px 20px;
  }

  button {
    color: white;
    padding: 5px 10px;
    background: transparent;
    border: none;
    cursor: pointer;
    outline: none;
  }
`

type LinkDirection = {
  pathname: string
  state: { [id: string]: unknown }
}

type Props = {
  linkUrl?: string | LinkDirection
  goBackDirection?: string | null
}

const LinkButton: React.FC<Props> = ({ linkUrl, goBackDirection }) => {
  const history = useHistory()

  const onGoBack = () => {
    if (goBackDirection) {
      history.push(goBackDirection)
      return
    }
    history.goBack()
  }

  return (
    <LinkButtonContainer>
      {linkUrl ? (
        <Link to={linkUrl}>{'>'}</Link>
      ) : (
        <button onClick={onGoBack}>{'<'}</button>
      )}
    </LinkButtonContainer>
  )
}

export default LinkButton
