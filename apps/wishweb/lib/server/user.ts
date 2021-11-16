import { query } from './db'
import { User } from '@wishlist/wishlib'

export const getUser = async (email: string): Promise<User> => (
  query(async (db) => {
    const collection = db.collection<User>('users')
    const user = await collection.findOne({ email })
    if (user) {
      return user
    } else {
      const created = new Date()
      const newUser: User = {
        email,
        created,
        modified: created,
      }
      const { insertedId } = await collection.insertOne(newUser)
      return {
        ...newUser,
        _id: insertedId.toHexString(),
      }
    }
  })
)
