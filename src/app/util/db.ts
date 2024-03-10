import { Connection } from 'mongoose'
import Models from '../../models'

import measure from './stopwatch'
import { prjSettingsData } from '../../mocks/project-settings.mock'
import config from '../util/config'

const mongoose = require('mongoose')

class MyMongoClient {
  #connection: Connection | undefined = undefined
  myUri: string
  myDbName: string

  constructor(uri: string, dbName: string) {
    this.myUri = uri
    this.myDbName = dbName
  }

  async openConnection(): Promise<void> {
    this.#connection = await mongoose
      .createConnection(`${this.myUri}/${this.myDbName}`, {
        maxPoolSize: config.db.poolSize,
      })
      .asPromise()
    console.log(`Db connection (pool: ${config.db.poolSize}) is open!`)
  }

  get connection(): Connection {
    if (!this.#connection) throw new Error('Connection is not ready yet!')
    return this.#connection
  }
}

async function measureCalls(connection: Connection) {
  const models = new Models(connection)

  await measure(
    models.projectSettings.where({ prj_id: '555' }).findOne(),
    (res) => console.log('Find a document finished. Result: ', res)
  )

  await measure(
    new Promise(async (resolve, reject) => {
      const doc = await models.projectSettings
        .where({ prj_id: '123' })
        .findOne()

      if (!doc) {
        reject()
        return
      }

      await doc.save()
      resolve(doc)
    }),
    (res) => console.log('Update a document finished. Result: ', res)
  )

  await measure(
    new Promise(async (resolve, reject) => {
      const newDoc = new models.projectSettings({
        prj_id: '920103',
        data: prjSettingsData,
      })
      try {
        await newDoc.save()
        resolve(newDoc)
      } catch (err) {
        reject(err)
      }
    }),
    (res) => console.log('Adding a new document finished. Result: ', res)
  )
}

export default new MyMongoClient(config.db.uri, config.db.dbName)
export { measureCalls }
