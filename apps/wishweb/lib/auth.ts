import createHttpError from 'http-errors'
import { NextApiHandler } from 'next'
import { JwtPayload, verify } from 'jsonwebtoken'
import { AuthenticatedRequest } from './types'

const secret = 'foobar'

export const authenticate: NextApiHandler = async (req) => {
  const authorization = req.headers?.authorization
  if (!authorization || !authorization.startsWith('Bearer ')) throw createHttpError(401)
  const [, token] = authorization.split('Bearer ')
  try {
    (req as AuthenticatedRequest).jwt = verify(token, secret, { algorithms: ['HS256'] }) as JwtPayload
  } catch (err) {
    throw createHttpError(401, err.message)
  }
}
