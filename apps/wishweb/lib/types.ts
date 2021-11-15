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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export declare type AuthenticatedApiHandler<T = any> = (req: AuthenticatedRequest, res: NextApiResponse<T>) => void | Promise<void>

export interface AuthenticatedRequest extends NextApiRequest {
  jwt: JWTVerifyResult
}
