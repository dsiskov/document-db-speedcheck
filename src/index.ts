import dbClient from './util/db'

async function setupDb() {
  await dbClient.openConnection()

  //await measureCalls(dbClient.connection)
}

setupDb()
