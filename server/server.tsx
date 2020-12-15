import express from 'express'
import path from 'path'
import fs from 'fs'
import React from 'react'
import ReactDOMServer from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'
import App from '../src/App'
import { Provider } from 'react-redux'
import { store } from '../src/redux/store'
import { ServerStyleSheet, StyleSheetManager } from 'styled-components'

const app = express()
const sheet = new ServerStyleSheet()

app.use(express.static(path.join(__dirname)))

function renderFullPage(html: string, preloadedState: any) {
  return `
    <!doctype html>
    <html>
      <head>
        <title>Redux Universal Example</title>
      </head>
      <body>
        <div id="root">${html}</div>
        <script>
          window.__PRELOADED_STATE__ = ${JSON.stringify(
            preloadedState
          ).replace(/</g, '\\u003c')}
        </script>
        <script src="/static/bundle.js"></script>
      </body>
    </html>
  `
}

app.get('/*', async (req, res) => {
  try {
    const context = {}

    const app = ReactDOMServer.renderToString(
      <Provider store={store}>
        <StaticRouter context={context} location={req.url}>
          <StyleSheetManager sheet={sheet.instance}>
            <App />
          </StyleSheetManager>
        </StaticRouter>
      </Provider>
    )

    const indexFile = path.resolve('./build/index.html')
    fs.readFile(indexFile, 'utf8', (err, data) => {
      if (err) {
        console.error('Something went wrong:', err)
        return res.status(500).send('Oops, better luck next time!')
      }

      const preloadedState = store.getState()

      res.send(renderFullPage(app, preloadedState))
    })
  } catch (error) {
    console.error(error)
  } finally {
    sheet.seal()
  }
})

app.use(express.static('./build'))

app.listen(3000, () => console.log('Listening on localhost:3000'))
