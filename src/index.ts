import express from 'express'
import router from './app/router'
import dbClient from './app/util/db'
import config from './app/util/config'
import applyMiddleware from './middleware'
import { logger } from './app/util/logger'

async function setupDb() {
  await dbClient.openConnection()

  //await measureCalls(dbClient.connection)
}

setupDb()
const app = express()
applyMiddleware(app)

app.use('/api', router)

const PORT = config.server.port
app.listen(PORT, () => {
  logger.info(`Server is running on port ${PORT}`)
})
