import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import router from './app/router'
import dbClient from './app/util/db'
import config from './app/util/config'

async function setupDb() {
  await dbClient.openConnection()

  //await measureCalls(dbClient.connection)
}

setupDb()
const app = express()

app.use(cors())
app.use(helmet())
app.use('/api', router)

const PORT = config.server.port
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
