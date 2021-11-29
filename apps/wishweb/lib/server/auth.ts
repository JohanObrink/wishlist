import createHttpError from 'http-errors'
import { NextApiHandler } from 'next'
import { JwtPayload, verify, sign } from 'jsonwebtoken'
import { Credentials, OAuth2Client, OAuth2ClientOptions, TokenInfo } from 'google-auth-library'
import { AuthenticatedRequest } from '../types'
import Config from './config'
import { User } from '@wishlist/wishlib'

// static
const options: OAuth2ClientOptions = {
  clientId: Config.GOOGLE_CLIENT_ID,
  clientSecret: Config.GOOGLE_CLIENT_SECRET,
  redirectUri: Config.GOOGLE_REDIRECT_URI,
}
const client = new OAuth2Client(options)
export const googleAuthUrl = client.generateAuthUrl({
  scope: ['https://www.googleapis.com/auth/userinfo.email', 'https://www.googleapis.com/auth/userinfo.profile'],
})

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

export const getInfoFromCode = async (code: string): Promise<TokenInfo> => {
  const { tokens } = await client.getToken(code)
  return client.getTokenInfo(tokens.access_token)
}

export const getInfoFromCredentials = async (credentials: Credentials): Promise<TokenInfo> => {
  client.setCredentials(credentials)
  return client.getTokenInfo(credentials.access_token)
}

interface AuthQuery {
  code?: string
  access_token?: string
  id_token?: string
}
export const getGUserInfo = async ({ code, access_token, id_token }: AuthQuery): Promise<TokenInfo> => {
  if (!(code || (access_token && id_token))) throw createHttpError(401)

  return (code) ? getInfoFromCode(code) : getInfoFromCredentials({ id_token, access_token })
}

export const createSessionToken = (user: User): string => (
  sign({}, Config.JWT_SHARED_SECRET, { algorithm: 'HS256', subject: user.email })
)
