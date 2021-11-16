import { Wishlist, WishlistCollection } from '@wishlist/wishlib'
import { authenticatedRoute } from '../../../lib/server/route'
import { AuthenticatedApiHandler } from '../../../lib/types'
import { getLists, addList } from '../../../lib/server/list'

export const get: AuthenticatedApiHandler<WishlistCollection> = async (req, res) => {
  const lists = await getLists(req.jwt.sub)
  res.send(lists)
}

export const post: AuthenticatedApiHandler<Wishlist> = async (req, res) => {
  const userId = req.jwt.sub
  const newList: Wishlist = {
    ...req.body,
    owner: userId,
  }
  const list = await addList(newList)
  res.redirect(303, `./${list._id}`)
}

export default authenticatedRoute({ get, post })
