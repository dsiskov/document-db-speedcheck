const { Schema } = require('mongoose')
const { connection } = require('../util/document-db-mongoose')

const schema = new Schema({
  prj_id: String,
  data: Object,
})

export default connection.model('ProjectSettings', schema, 'ProjectSettings')
