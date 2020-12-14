import { createGlobalStyle } from 'styled-components'

export const Global = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  
  a {
    text-decoration: none;
  }
  
  :root {
    font-family: Arial, Helvetica, sans-serif;
  }
`

export default Global
