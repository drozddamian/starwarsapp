import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { ROUTES } from './constants'
import GlobalStyles from './styles/global'
import ListScreen from './screens/List'
import CharacterScreen from './screens/Character'

function App() {
  return (
    <>
      <GlobalStyles />

      <Router>
        <Switch>
          <Route exact path={ROUTES.LIST.route}>
            <ListScreen />
          </Route>
          <Route exact path={ROUTES.CHARACTER.route}>
            <CharacterScreen />
          </Route>
        </Switch>
      </Router>
    </>
  )
}

export default App
