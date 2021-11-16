import { Document, Filter, ObjectId, Sort } from 'mongodb'
import { query } from './db'
import { Wishlist, WishlistCollection, WishlistLite } from '@wishlist/wishlib'
import createHttpError from 'http-errors'

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

export const getList = async (id: string, userId: string): Promise<Wishlist> => (
  query(async (db) => {
    const _id = new ObjectId(id)
    const collection = db.collection<Wishlist>('lists')
    const list = await collection.findOne({ _id })
    if (!list) throw createHttpError(404)
    if (list.owner !== userId) throw createHttpError(403)
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

export const updateList = async (id: string, list: Partial<Wishlist>, userId: string): Promise<Wishlist> => (
  query(async (db) => {
    const collection = db.collection<Wishlist>('lists')
    const _id = new ObjectId(id)
    const filter: Filter<Wishlist> = { _id }

    const oldList = await collection.findOne(filter)
    if (!oldList) throw createHttpError(404)
    if (oldList.owner !== userId) throw createHttpError(403)

    delete list._id
    await collection.updateOne(filter, { $set: list })
    return {
      ...oldList,
      ...list,
      _id: id,
    }
  })
)

export const deleteList = async (id: string, userId: string): Promise<void> => {
  query(async (db) => {
    const collection = db.collection<Wishlist>('lists')
    const _id = new ObjectId(id)
    const filter: Filter<Wishlist> = { _id }

    const oldList = await collection.findOne(filter, { projection: { owner: 1 } })
    if (!oldList) throw createHttpError(404)
    if (oldList.owner !== userId) throw createHttpError(403)

    await collection.deleteOne(filter)
  })
}
