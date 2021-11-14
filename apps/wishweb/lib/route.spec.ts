import { NextApiRequest, NextApiResponse } from 'next'
import { route } from './route'
import { RouteConfig } from './types'

describe('route', () => {
  let req: NextApiRequest
  let res: NextApiResponse
  beforeEach(() => {
    const _req: Partial<NextApiRequest> = {}
    const _res: Partial<NextApiResponse> = {}
    _res.status = jest.fn().mockName('status').mockReturnValue(_res)
    _res.send = jest.fn().mockName('send').mockReturnValue(_res)
    _res.end = jest.fn().mockName('end').mockReturnValue(_res)

    req = _req as NextApiRequest
    res = _res as NextApiResponse
  })
  it('returns a function', () => {
    const handler = route({})

    expect(handler).toBeInstanceOf(Function)
  })
  it('responds with 405 if method is undefined', async () => {
    const handler = route({})
    req.method = undefined

    await handler(req, res)

    expect(res.status).toHaveBeenCalledWith(405)
  })
  it('responds with 405 if method handler is missing', async () => {
    const handler = route({})
    req.method = 'GET'

    await handler(req, res)

    expect(res.status).toHaveBeenCalledWith(405)
  })
  it('calls method handler for GET', async () => {
    const config: RouteConfig = {
      get: jest.fn(),
    }
    const handler = route(config)
    req.method = 'GET'

    await handler(req, res)

    expect(config.get).toHaveBeenCalledWith(req, res)
  })
  it('calls method handler for POST', async () => {
    const config: RouteConfig = {
      post: jest.fn(),
    }
    const handler = route(config)
    req.method = 'POST'

    await handler(req, res)

    expect(config.post).toHaveBeenCalledWith(req, res)
  })
  it('calls method handler for PUT', async () => {
    const config: RouteConfig = {
      put: jest.fn(),
    }
    const handler = route(config)
    req.method = 'PUT'

    await handler(req, res)

    expect(config.put).toHaveBeenCalledWith(req, res)
  })
  it('calls method handler for PATCH', async () => {
    const config: RouteConfig = {
      patch: jest.fn(),
    }
    const handler = route(config)
    req.method = 'PATCH'

    await handler(req, res)

    expect(config.patch).toHaveBeenCalledWith(req, res)
  })
  it('calls method handler for DELETE', async () => {
    const config: RouteConfig = {
      del: jest.fn(),
    }
    const handler = route(config)
    req.method = 'DELETE'

    await handler(req, res)

    expect(config.del).toHaveBeenCalledWith(req, res)
  })
  it('calls before handlers before method handler', async () => {
    const config: RouteConfig = {
      before: [jest.fn()],
      get: jest.fn(),
    }
    const handler = route(config)
    req.method = 'GET'

    await handler(req, res)

    expect(config.before[0]).toHaveBeenCalledWith(req, res)
  })
  it('calls after handlers after method handler', async () => {
    const config: RouteConfig = {
      after: [jest.fn()],
      get: jest.fn(),
    }
    const handler = route(config)
    req.method = 'GET'

    await handler(req, res)

    expect(config.after[0]).toHaveBeenCalledWith(req, res)
  })
})