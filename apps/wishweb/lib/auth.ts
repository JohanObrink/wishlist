import createHttpError from 'http-errors'
import { NextApiHandler } from 'next'
import { jwtVerify } from 'jose'

const secret = 'foobar'

export const middleware: NextApiHandler = async (req) => {
  const authorization = req.headers?.authorization
  if (!authorization || !authorization.startsWith('Bearer ')) throw createHttpError(401)
  const [, token] = authorization.split('Bearer ')
  try {
    await jwtVerify(token, Buffer.from(secret))
  } catch (err) {
    throw createHttpError(401, err.message)
  }
  return
}
