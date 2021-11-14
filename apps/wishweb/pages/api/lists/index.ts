import { NextApiHandler } from 'next'
import { Wishlist } from '@wishlist/wishlib'
import { route } from '../../../lib/route'

export const get: NextApiHandler<Wishlist[]> = async (req, res) => {
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

export default route({ get })
