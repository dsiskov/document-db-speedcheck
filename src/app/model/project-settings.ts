import { Schema } from 'mongoose'

interface IProjectSettings {
  prj_id: string
  data: object
}

const prjSettingsSchema = new Schema<IProjectSettings>({
  prj_id: String,
  data: Object,
})

export default prjSettingsSchema
export { IProjectSettings }
