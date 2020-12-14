import React from 'react'
import styled, { keyframes } from 'styled-components'

const loader1 = keyframes`
  from {
    transform: scale(0);
  }
  to {
    transform: scale(1);
  }
`
const loader2 = keyframes`
  from {
    transform: translate(0, 0);
  }
  to {
    transform: translate(24px, 0);
  }
`
const loader3 = keyframes`
  from {
    transform: scale(1);
  }
  to {
    transform: scale(0);
  }
`

const Wrapper = styled.div`
  display: inline-block;
  position: relative;
  width: 100%;
  height: 18px;

  div {
    position: absolute;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: gray;
    animation-timing-function: cubic-bezier(0, 1, 1, 0);

    :nth-child(1) {
      left: 8px;
      animation: ${loader1} 0.6s infinite;
    }

    :nth-child(2) {
      left: 8px;
      animation: ${loader2} 0.6s infinite;
    }

    :nth-child(3) {
      left: 32px;
      animation: ${loader2} 0.6s infinite;
    }

    :nth-child(4) {
      left: 56px;
      animation: ${loader3} 0.6s infinite;
    }
  }
`

const InlineLoader: React.FC = () => (
  <Wrapper>
    <div />
    <div />
    <div />
    <div />
  </Wrapper>
)

export default InlineLoader
