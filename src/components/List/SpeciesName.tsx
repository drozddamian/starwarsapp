import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import axios from 'axios'
import InlineLoader from '../Loader/InlineLoader'

const Wrapper = styled.div`
  padding-top: 24px;
`

const SpeciesNameText = styled.h3`
  color: #7b8fa4;
`

type SpeciesNameProps = {
  speciesUrl: string
}

const SpeciesName: React.FC<SpeciesNameProps> = ({ speciesUrl }) => {
  const [name, setName] = useState('Unknown species')
  const [isLoading, setIsLoading] = useState(true)

  const setSpeciesName = async () => {
    try {
      const {
        data: { name },
      } = await axios.get(speciesUrl)

      const speciesName = `${name}'s species`
      setName(speciesName)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (speciesUrl.length === 0) {
      setIsLoading(false)
      return
    }
    setSpeciesName()
  }, [])

  return (
    <Wrapper>
      {isLoading ? (
        <InlineLoader />
      ) : (
        <SpeciesNameText>{name}</SpeciesNameText>
      )}
    </Wrapper>
  )
}

export default SpeciesName
