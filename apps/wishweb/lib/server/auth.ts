import createHttpError from 'http-errors'
import { NextApiHandler } from 'next'
import { JwtPayload, verify, sign } from 'jsonwebtoken'
import { OAuth2Client, OAuth2ClientOptions, TokenInfo } from 'google-auth-library'
import { AuthenticatedRequest } from '../types'
import Config from './config'
import { User } from '@wishlist/wishlib'

// static
const options: OAuth2ClientOptions = {
  clientId: Config.GOOGLE_CLIENT_KEY,
  clientSecret: Config.GOOGLE_CLIENT_SECRET,
  redirectUri: Config.GOOGLE_REDIRECT_URI,
}
const client = new OAuth2Client(options)
export const googleAuthUrl = client.generateAuthUrl({ scope: 'https://www.googleapis.com/auth/userinfo.email' })

// functions
export const authenticate: NextApiHandler = async (req) => {
  const authorization = req.headers?.authorization
  if (!authorization || !authorization.startsWith('Bearer ')) throw createHttpError(401)
  const [, token] = authorization.split('Bearer ')
  try {
    (req as AuthenticatedRequest).jwt = verify(token, Config.JWT_SHARED_SECRET, { algorithms: ['HS256'] }) as JwtPayload
  } catch (err) {
    throw createHttpError(401, err.message)
  }
}

export const getToken = async (code: string): Promise<string> => {
  const token = await client.getToken(code)
  return token.tokens.access_token
}

export const getTokenInfo = (token: string): Promise<TokenInfo> => (
  client.getTokenInfo(token)
)

export const createSessionToken = (user: User): string => (
  sign({}, Config.JWT_SHARED_SECRET, { algorithm: 'HS256', subject: user.email })
)
