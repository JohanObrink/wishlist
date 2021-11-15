import { AuthenticatedApiHandler, AuthenticatedRouteConfig, RouteConfig } from './types'
import createHttpError, { HttpError } from 'http-errors'
import { NextApiHandler, NextApiResponse } from 'next'
import { authenticate } from './auth'

const handleError = (res: NextApiResponse, err: HttpError): void => {
  const { message, name, statusCode, stack } = err
  res.status(statusCode || 500).send({ name, message, stack})
}

export const route = (config: RouteConfig): NextApiHandler => async (req, res) => {
  const method = req.method?.toLowerCase()
  try {
    const handlerName = method === 'delete' ? 'del' : method
    // method unknown
    if (!handlerName || !config[handlerName]) throw createHttpError(405)

    // run befores
    for (const handler of config.before || []) {
      await handler(req, res)
    }
    // run handler
    await config[handlerName](req, res)
    // run afters
    for (const handler of config.after || []) {
      await handler(req, res)
    }
  } catch (err) {
    handleError(res, err)
  }
}

export const authenticatedRoute = (config: AuthenticatedRouteConfig): AuthenticatedApiHandler => (
  route({
    ...config,
    before: [authenticate, ...(config.before || [])]
  })
)
