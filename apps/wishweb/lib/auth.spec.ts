import createHttpError from 'http-errors'
import { SignJWT } from 'jose'
import { NextApiRequest, NextApiResponse } from 'next'
import { middleware } from './auth'

describe('auth', () => {
  describe('middleware', () => {
    let req: NextApiRequest
    let res: NextApiResponse
    beforeEach(() => {
      const _req: Partial<NextApiRequest> = {
        headers: {},
      }
      const _res: Partial<NextApiResponse> = {}

      req = _req as NextApiRequest
      res = _res as NextApiResponse
    })
    it('throws 401 if authorization header is missing', async () => {
      req.headers = {}

      await expect(() => middleware(req, res)).rejects.toThrow(createHttpError(401))
    })
    it('throws 401 if authorization header is malformed', async () => {
      req.headers = { authorization: 'Foo' }

      await expect(() => middleware(req, res)).rejects.toThrow(createHttpError(401))
    })
    it('throws 401 if bearer token is malformed', async () => {
      req.headers = { authorization: 'Bearer Foo' }

      await expect(() => middleware(req, res)).rejects.toThrow(createHttpError(401, 'Invalid Compact JWS'))
    })
    it('throws 401 if bearer token signature is wrong', async () => {
      const jwt = await new SignJWT({ foo: 'bar' })
        .setProtectedHeader({ alg: 'HS256' })
        .sign(Buffer.from('wrong'))
      req.headers = { authorization: `Bearer ${jwt}` }

      await expect(() => middleware(req, res)).rejects.toThrow(createHttpError(401, 'signature verification failed'))
    })
  })
})
