import Models from '../../models'
import { IProjectSettings } from '../model/project-settings'
import dbClient from '../util/db'

async function find({
  projectId,
}: {
  projectId: string
}): Promise<IProjectSettings> {
  const models = new Models(dbClient.connection)
  const k = await models.projectSettings
    .where({ project_id: projectId })
    .findOne()

  return <IProjectSettings>k
}

export default find
