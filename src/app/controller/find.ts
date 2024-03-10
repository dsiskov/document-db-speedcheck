import Models from '../../models'
import { IProjectSettings } from '../model/project-settings'
import dbClient from '../util/db'

async function find({
  projectId,
}: {
  projectId: string
}): Promise<IProjectSettings> {
  const models = new Models(dbClient.connection)
  const k = await models.projectSettings.where({ prj_id: projectId }).findOne()

  return k as IProjectSettings
}

export default find
