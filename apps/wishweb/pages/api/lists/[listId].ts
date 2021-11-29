import { Wishlist } from '@wishlist/wishlib'
import { authenticatedRoute } from '../../../lib/server/route'
import { AuthenticatedApiHandler } from '../../../lib/types'
import { deleteList, getList, updateList } from '../../../lib/server/list'

export const get: AuthenticatedApiHandler<Wishlist> = async (req, res) => {
  const { listId } = req.query
  const userId = req.jwt.sub
  const list = await getList(listId as string, userId)
  res.send(list)
}

export const put: AuthenticatedApiHandler<Wishlist> = async (req, res) => {
  const { listId } = req.query
  const userId = req.jwt.sub
  const newList: Wishlist = {
    ...req.body,
    owner: userId,
  }
  const list = await updateList(listId as string, newList, userId)
  res.send(list)
}

export const del: AuthenticatedApiHandler = async (req, res) => {
  const { listId } = req.query
  const userId = req.jwt.sub
  await deleteList(listId as string, userId)
  res.status(204).end()
}

export default authenticatedRoute({ get, put, patch: put, del })
