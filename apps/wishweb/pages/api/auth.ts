/*
auth?

code=4%2F0AX4XfWg4C7x0fSBo2cB_sVf00BB1bYzFsDMbk2W0a9ltbH8dmNxFO8hyTthESP6Qk_9Jpg&
scope=email+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email+openid&
authuser=0&
prompt=consent#
*/

import { NextApiHandler } from 'next'
import { route } from '../../lib/server/route'
import { createSessionToken, getToken, getTokenInfo } from '../../lib/server/auth'
import { getUser } from '../../lib/server/user'

const get: NextApiHandler = async (req, res) => {
  const { code } = req.query
  const token = await getToken(code as string)
  const info = await getTokenInfo(token)
  const user = await getUser(info.email)
  const jwt = createSessionToken(user)

  res.send({
    code,
    token,
    info,
    user,
    jwt,
  })
}

export default route({ get })
