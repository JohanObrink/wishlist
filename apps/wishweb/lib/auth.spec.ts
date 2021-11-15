import createHttpError from 'http-errors'
import { JWTHeaderParameters, JWTPayload, SignJWT } from 'jose'
import { NextApiRequest, NextApiResponse } from 'next'
import { authenticate } from './auth'
import { AuthenticatedRequest } from './types'

describe('auth', () => {
  describe('authenticate', () => {
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

      await expect(() => authenticate(req, res)).rejects.toThrow(createHttpError(401))
    })
    it('throws 401 if authorization header is malformed', async () => {
      req.headers = { authorization: 'Foo' }

      await expect(() => authenticate(req, res)).rejects.toThrow(createHttpError(401))
    })
    it('throws 401 if bearer token is malformed', async () => {
      req.headers = { authorization: 'Bearer Foo' }

      await expect(() => authenticate(req, res)).rejects.toThrow(createHttpError(401, 'Invalid Compact JWS'))
    })
    it('throws 401 if bearer token signature is wrong', async () => {
      const jwt = await new SignJWT({ foo: 'bar' })
        .setProtectedHeader({ alg: 'HS256' })
        .sign(Buffer.from('wrong'))
      req.headers = { authorization: `Bearer ${jwt}` }

      await expect(() => authenticate(req, res)).rejects.toThrow(createHttpError(401, 'signature verification failed'))
    })
    it('adds jwt to req if verify succeeds', async () => {
      const payload: JWTPayload = { foo: 'bar' }
      const protectedHeader: JWTHeaderParameters = { alg: 'HS256' }
      const jwt = await new SignJWT(payload)
        .setProtectedHeader(protectedHeader)
        .sign(Buffer.from('foobar'))
      req.headers = { authorization: `Bearer ${jwt}` }
      await authenticate(req, res)

      expect((req as AuthenticatedRequest).jwt).toEqual({ payload, protectedHeader })
    })
  })
})
