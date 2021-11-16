import createHttpError from 'http-errors'
import { sign } from 'jsonwebtoken'
import { NextApiRequest, NextApiResponse } from 'next'
import { authenticate } from './auth'
import { AuthenticatedRequest } from '../types'
import Config from './config'

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

      await expect(() => authenticate(req, res)).rejects.toThrow(createHttpError(401, 'jwt malformed'))
    })
    it('throws 401 if bearer token alg. is none', async () => {
      const jwt = sign({ foo: 'bar' }, 'xxx', { algorithm: 'none' })
      req.headers = { authorization: `Bearer ${jwt}` }

      await expect(() => authenticate(req, res)).rejects.toThrow(createHttpError(401, 'jwt signature is required'))
    })
    it('throws 401 if bearer token signature is wrong', async () => {
      const jwt = sign({ foo: 'bar' }, 'wrong', { algorithm: 'HS256' })
      req.headers = { authorization: `Bearer ${jwt}` }

      await expect(() => authenticate(req, res)).rejects.toThrow(createHttpError(401, 'invalid signature'))
    })
    it('adds jwt to req if verify succeeds', async () => {
      const payload = { foo: 'bar' }
      const jwt = sign(payload, Config.JWT_SHARED_SECRET, { algorithm: 'HS256' })
      req.headers = { authorization: `Bearer ${jwt}` }
      await authenticate(req, res)

      expect((req as AuthenticatedRequest).jwt.foo).toEqual(payload.foo)
    })
  })
})
