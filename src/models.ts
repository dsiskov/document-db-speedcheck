import { Connection } from 'mongoose'
import prjSettingsSchema from './model/project-settings'

class Models {
  connection: Connection

  constructor(conn: Connection) {
    this.connection = conn
  }

  get projectSettings() {
    return this.connection.model(
      'ProjectSettings',
      prjSettingsSchema,
      'ProjectSettings'
    )
  }
}

export default Models
