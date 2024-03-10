import dotenv from 'dotenv'
dotenv.config()

interface IEnv {
  db: IDbConfig
  server: {
    port: number
  }
}
interface IDbConfig {
  poolSize: number
  uri: string
  dbName: string
}

const env: IEnv = Object.freeze({
  db: {
    poolSize: Number(process.env.DB_CONNECTION_POOL_SIZE) || 10,
    uri: process.env.DB_CONNECTION_URI || 'undefined', // todo: throw
    dbName: process.env.DB_DATABASE_NAME || 'undefined',
  },
  server: {
    port: Number(process.env.PORT) || 3000,
  },
})

export default env
