import { prjSettingsData } from '../../mocks/project-settings.mock'
import Models from '../model/models'
import { IProjectSettings } from '../model/project-settings'
import dbClient, { insertBulk as dbInsertBulk } from '../util/db'

async function find({
  projectId,
}: {
  projectId: string
}): Promise<IProjectSettings> {
  const models = new Models(dbClient.connection)
  const k = await models.projectSettings.where({ prj_id: projectId }).findOne()

  return k as IProjectSettings
}

async function insertBulk(
  idOffset: number,
  count: number,
  batchSize: number
): Promise<void> {
  const models = new Models(dbClient.connection)
  const documents = Array.from({ length: count }).map((_, i) => ({
    prj_id: (idOffset + i + 1).toString(),
    data: prjSettingsData,
  }))

  await dbInsertBulk(models.projectSettings, documents, batchSize)
}

export { find, insertBulk }
