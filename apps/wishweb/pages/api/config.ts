import { ClientConfig } from '../../lib/types'
import { NextApiHandler } from 'next'
import { googleAuthUrl } from '../../lib/server/auth'

const config: NextApiHandler<ClientConfig> = (_, res) => {
  res.send({
    googleAuthUrl,
  })
}

export default config
