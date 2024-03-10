import { Schema } from 'mongoose'

type ProjectSettingsItem = {
  key: string
  value: string
}

type ProjectSettings = {
  settings: Array<ProjectSettingsItem>
}

interface IProjectSettings {
  prj_id: string
  data: ProjectSettings
}

const prjSettingsSchema = new Schema<IProjectSettings>({
  prj_id: String,
  data: Object,
})

export default prjSettingsSchema
export { IProjectSettings, ProjectSettings }
