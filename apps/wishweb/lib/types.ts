import { NextApiHandler } from 'next'

export interface RouteConfig {
  get?: NextApiHandler
  post?: NextApiHandler
  put?: NextApiHandler
  patch?: NextApiHandler
  del?: NextApiHandler

  before?: NextApiHandler[]
  after?: NextApiHandler[]
}
