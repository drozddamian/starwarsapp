import express from 'express'
import path from 'path'
import fs from 'fs'
import React from 'react'
import ReactDOMServer from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'
import App from '../src/App'
import { Provider } from 'react-redux'
import { store } from '../src/redux/store'

const app = express()

app.use(express.static(path.join(__dirname)))

app.get('/*', async (req, res) => {
  const context = {}
  const app = ReactDOMServer.renderToString(
    <Provider store={store}>
      <StaticRouter context={context} location={req.url}>
        <App />
      </StaticRouter>
    </Provider>
  )

  const indexFile = path.resolve('./build/index.html')
  fs.readFile(indexFile, 'utf8', (err, data) => {
    if (err) {
      console.error('Something went wrong:', err)
      return res.status(500).send('Oops, better luck next time!')
    }

    return res.send(
      data.replace('<div id="root"></div>', `<div id="root">${app}</div>`)
    )
  })
})

app.use(express.static('./build'))

app.listen(3000, () => console.log('Listening on localhost:3000'))
