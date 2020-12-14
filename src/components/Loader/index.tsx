import styled, { keyframes } from 'styled-components'

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`

export default styled.div`
  display: inline-block;
  border-radius: 50%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  :after {
    content: ' ';
    display: block;
    width: 48px;
    height: 48px;
    margin: 8px;
    border-radius: 50%;
    border: 6px solid;
    border-color: #e93578 transparent #e93578 transparent;
    animation: ${rotate} 1.2s linear infinite;
  }
`
