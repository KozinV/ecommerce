import express from 'express'
import path from 'path'
import cors from 'cors'
import bodyParser from 'body-parser'
import sockjs from 'sockjs'
import { renderToStaticNodeStream } from 'react-dom/server'
import React from 'react'
import axios from 'axios'

import cookieParser from 'cookie-parser'
import config from './config'
import Html from '../client/html'

// const { unlink } = require('fs').promises // readFile, writeFile,
const { readFile, writeFile, unlink } = require('fs').promises //
const data = require('./data')

const Root = () => ''

try {
  // eslint-disable-next-line import/no-unresolved
  // ;(async () => {
  //   const items = await import('../dist/assets/js/root.bundle')
  //   console.log(JSON.stringify(items))

  //   Root = (props) => <items.Root {...props} />
  //   console.log(JSON.stringify(items.Root))
  // })()
  console.log(Root)
} catch (ex) {
  console.log(' run yarn build:prod to enable ssr')
}

let connections = []

const port = process.env.PORT || 8090
const server = express()

const middleware = [
  cors(),
  express.static(path.resolve(__dirname, '../dist/assets')),
  bodyParser.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }),
  bodyParser.json({ limit: '50mb', extended: true }),
  cookieParser()
]

middleware.forEach((it) => server.use(it))

server.get('/api/v1/products', (req, res) => {
  res.json(data.slice(0, 15))
})

server.get('/api/v1/logs', async (req, res) => {
  const getLogs = await readFile(`${__dirname}/logs.json`, { encoding: 'utf8' }).then((datas) =>
    JSON.parse(datas)
  )
  res.json(getLogs)
})

server.post('/api/v1/logs', async (req, res) => {
  console.log(req.body)
  const newLog = req.body
  const logs = await readFile(`${__dirname}/logs.json`, { encoding: 'utf8' })
    .then((datas) => JSON.parse(datas))
    .catch(() => {
      return writeFile(`${__dirname}/logs.json`, '[]', { encoding: 'utf8' }).then(() => {
        return []
      })
    })
  const newLogs = [...logs, newLog]
  writeFile(`${__dirname}/logs.json`, JSON.stringify(newLogs), { encoding: 'utf8' })
  res.json(req.body)
})

server.delete('/api/v1/logs/', (req, res) => {
  unlink(`${__dirname}/logs.json`)
  res.end()
})

server.get('/api/v1/rates', async (req, res) => {
  const { data: rates } = await axios('https://api.exchangeratesapi.io/latest?symbols=USD,CAD')
  res.json(rates)
})

server.use('/api/', (req, res) => {
  res.status(404)
  res.end()
})

const [htmlStart, htmlEnd] = Html({
  body: 'separator',
  title: 'Skillcrucial - Become an IT HERO'
}).split('separator')

server.get('/', (req, res) => {
  const appStream = renderToStaticNodeStream(<Root location={req.url} context={{}} />)
  res.write(htmlStart)
  appStream.pipe(res, { end: false })
  appStream.on('end', () => {
    res.write(htmlEnd)
    res.end()
  })
})

server.get('/*', (req, res) => {
  const initialState = {
    location: req.url
  }

  return res.send(
    Html({
      body: '',
      initialState
    })
  )
})

const app = server.listen(port)

if (config.isSocketsEnabled) {
  const echo = sockjs.createServer()
  echo.on('connection', (conn) => {
    connections.push(conn)
    conn.on('data', async () => {})

    conn.on('close', () => {
      connections = connections.filter((c) => c.readyState !== 3)
    })
  })
  echo.installHandlers(app, { prefix: '/ws' })
}
console.log(`Serving at http://localhost:${port}`)
