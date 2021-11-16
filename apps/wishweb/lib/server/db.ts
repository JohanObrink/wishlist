import { Db, MongoClient } from 'mongodb'
import Config from './config'

const url = `mongodb://${Config.MONGODB_USERNAME}:${Config.MONGODB_PASSWORD}@${Config.MONGODB_HOST}/${Config.MONGODB_DATABASE}`
export const client = new MongoClient(url)

type Runner<T> = (db: Db) => T
export const query = async <T>(runner: Runner<T>): Promise<T> => {
  const conn = await client.connect()
  try {
    const db = conn.db()
    const result = await runner(db)
    return result
  } finally {
    conn.close()
  }
}
