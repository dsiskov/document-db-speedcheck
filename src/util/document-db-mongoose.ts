import { Connection, Schema } from 'mongoose'

const mongoose = require('mongoose')

const dbName = 'test'
const uri = 'mongodb://localhost:27017'
let connection: Connection

// todo: rename to getConnection, use when defining models
async function connect() {
  connection = await mongoose
    .createConnection(`${uri}/${dbName}`, {
      maxPoolSize: 10,
    })
    .asPromise()

  // const prjSettingsModel = connection.model(
  //   'ProjectSettings',
  //   new Schema({
  //     project_id: String,
  //     data: Object,
  //   }),
  //   'ProjectSettings'
  // )
  // const doc = await prjSettingsModel.where({ project_id: '1' }).findOne()

  console.log('Connected to MongoDB:', doc)
}

// NB: inserting too many documents needs to be batched
async function insertDocuments({
  collection,
  count,
  data,
  startFrom = 0,
}: {
  collection: { insertMany: Function }
  count: number
  data: object
  startFrom: number
}) {
  try {
    const documents = Array.from({ length: count }).map((_, i) => ({
      project_id: (startFrom + i + 1).toString(),
      data,
    }))

    await collection.insertMany(documents)
    const collectionSize = await mongoose.connection.db
      .collection('presentationManager')
      // .estimatedDocumentCount()
      .count()
    console.log('size of collection is ', collectionSize)
  } catch (err) {
    console.log(err)
  }
}

async function collectionCount() {
  return await connection.db.collection('presentationManager').count()
}

async function updateDocument({
  model,
  query,
  modification,
}: {
  model: { updateOne: Function }
  query: object
  modification: object
}) {
  const info = await model.updateOne(query, modification)
  console.log('Updated! Info: ', info)
}

export { connect, insertDocuments, updateDocument, collectionCount, connection }
