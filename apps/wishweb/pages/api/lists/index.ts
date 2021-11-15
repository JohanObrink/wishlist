import { Wishlist } from '@wishlist/wishlib'
import { authenticatedRoute } from '../../../lib/route'
import { AuthenticatedApiHandler } from '../../../lib/types'

export const get: AuthenticatedApiHandler<Wishlist[]> = async (req, res) => {
  res.send([{
    created: new Date(),
    due: new Date(),
    givers: [],
    id: 'id',
    modified: new Date(),
    name: 'name',
    owner: 'owner',
    wishes: [],
  }])
}

export default authenticatedRoute({ get })
