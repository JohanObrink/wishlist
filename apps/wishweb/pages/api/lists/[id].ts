import { Wishlist } from '@wishlist/wishlib'
import { authenticatedRoute } from '../../../lib/server/route'
import { AuthenticatedApiHandler } from '../../../lib/types'
import { getList } from '../../../lib/server/list'

export const get: AuthenticatedApiHandler<Wishlist> = async (req, res) => {
  const list = await getList(req.query.id as string)
  res.send(list)
}

export default authenticatedRoute({ get })
