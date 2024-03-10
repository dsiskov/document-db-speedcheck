import { Connection } from 'mongoose'
import prjSettingsSchema, { IProjectSettings } from './project-settings'

class Models {
  connection: Connection

  constructor(conn: Connection) {
    this.connection = conn
  }

  get projectSettings() {
    return this.connection.model<IProjectSettings>(
      'ProjectSettings',
      prjSettingsSchema,
      'ProjectSettings'
    )
  }
}

export default Models
