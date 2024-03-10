import { Connection, Model } from 'mongoose'
import Models from '../model/models'

import measure from './stopwatch'
import { prjSettingsData } from '../../mocks/project-settings.mock'
import config from '../util/config'
import { logger } from './logger'
import { IProjectSettings } from '../model/project-settings'

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
    logger.info(`Db connection (pool: ${config.db.poolSize}) is open!`)
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
    (res) => logger.info('Find a document finished. Result: ', res)
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
    (res) => logger.info('Update a document finished. Result: ', res)
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
    (res) => logger.info('Adding a new document finished. Result: ', res)
  )
}

async function insertBulk(
  model: Model<IProjectSettings>,
  documents: Array<IProjectSettings>,
  batchSize: number = 1000
): Promise<void> {
  let sliceItems = []
  let sliceIndex = 0
  do {
    sliceItems = documents.slice(sliceIndex, sliceIndex + batchSize)
    await model.insertMany(sliceItems)
    sliceIndex += batchSize
  } while (sliceIndex < documents.length)
}

export default new MyMongoClient(config.db.uri, config.db.dbName)
export { measureCalls, insertBulk }
