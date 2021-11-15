import { JWTVerifyResult } from 'jose'
import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'

export interface RouteConfig {
  get?: NextApiHandler
  post?: NextApiHandler
  put?: NextApiHandler
  patch?: NextApiHandler
  del?: NextApiHandler

  before?: NextApiHandler[]
  after?: NextApiHandler[]
}

export interface AuthenticatedRouteConfig extends RouteConfig {
  get?: AuthenticatedApiHandler
  post?: AuthenticatedApiHandler
  put?: AuthenticatedApiHandler
  patch?: AuthenticatedApiHandler
  del?: AuthenticatedApiHandler

  before?: (NextApiHandler | AuthenticatedApiHandler)[]
  after?: (NextApiHandler | AuthenticatedApiHandler)[]
}

export type AuthenticatedApiHandler = (req: AuthenticatedRequest, res: NextApiResponse) => void | Promise<void>

export interface AuthenticatedRequest extends NextApiRequest {
  jwt: JWTVerifyResult
}
