import { prjSettingsData } from './mocks/project-settings.mock'

import {
  connect,
  // insertDocuments,
  // updateDocument,
  collectionCount,
} from './util/document-db-mongoose'
import ProjectSettings from './model/project-settings'
import measure from './util/stopwatch'

async function run() {
  await connect()

  console.log('count is: ', await collectionCount())

  await measure(
    ProjectSettings.insertMany([{ prj_id: '1', data: prjSettingsData }]),
    (status) => console.log('inserted status: ', status)
  )

  await measure(ProjectSettings.where({ prj_id: '1' }).findOne(), (res) =>
    console.log('prj is found: ', res)
  )
}

run()
