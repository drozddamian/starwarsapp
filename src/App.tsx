import React, { ReactElement } from 'react'
import { Switch, Route } from 'react-router-dom'
import { ROUTES } from './constants'
import ListScreen from './screens/CharactersList'
import CharacterScreen from './screens/Character'

function App(): ReactElement {
  return (
    <Switch>
      <Route exact path={ROUTES.LIST.route}>
        <ListScreen />
      </Route>
      <Route exact path={ROUTES.CHARACTER.route}>
        <CharacterScreen />
      </Route>
    </Switch>
  )
}

export default App
