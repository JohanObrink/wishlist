import { Wish } from '@wishlist/wishlib'
import createHttpError from 'http-errors'
import { authenticatedRoute } from '../../../lib/server/route'
import { AuthenticatedApiHandler } from '../../../lib/types'
import { getList } from '../../../lib/server/list'

export const get: AuthenticatedApiHandler<Wish> = async (req, res) => {
  const [listId, wishId] = req.query.ids
  const userId = req.jwt.sub
  const list = await getList(listId as string, userId)
  const wish = list.wishes.find((w) => w._id === wishId)
  if (!wish) throw createHttpError(404)
  res.send(wish)
}

export default authenticatedRoute({ get })
