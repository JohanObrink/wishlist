import { Document, Filter, ObjectId, Sort } from 'mongodb'
import { query } from './db'
import { Wishlist, WishlistCollection, WishlistLite } from '@wishlist/wishlib'

export const getLists = async (email: string): Promise<WishlistCollection> => (
  query(async (db) => {
    const collection = db.collection<WishlistLite>('lists')
    const filter: Filter<WishlistLite> = { owner: email }
    const projection: Document = {
      _id: 1,
      name: 1,
      due: 1, 
      givers: { $size: '$givers' },
      wishes: { $size: '$wishes' },
    }
    const sort: Sort = { due: 1 }
    const mine = await collection.find(filter, { projection, sort }).toArray()
    const others = []
    return { mine, others }
  })
)

export const getList = async (id: string): Promise<Wishlist> => (
  query(async (db) => {
    const _id = new ObjectId(id)
    const collection = db.collection<Wishlist>('lists')
    const list = await collection.findOne({ _id })
    return list
  })
)

export const addList = async (list: Wishlist): Promise<Wishlist> => (
  query(async (db) => {
    const collection = db.collection<Wishlist>('lists')
    const { insertedId } = await collection.insertOne(list)
    return {
      ...list,
      _id: insertedId.toHexString()
    }
  })
)
