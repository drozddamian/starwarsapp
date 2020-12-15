import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { store } from './redux/store'
import App from './App'
import GlobalStyles from './styles/global'
import { BrowserRouter as Router } from 'react-router-dom'

ReactDOM.hydrate(
  <React.StrictMode>
    <Provider store={store}>
      <GlobalStyles />
      <Router>
        <App />
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
)
