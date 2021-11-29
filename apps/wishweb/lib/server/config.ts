import { config } from 'dotenv'
import { resolve } from 'path'

// read .env into config in dev
if (process.env.NODE_ENV !== 'production')  {
  try { config({ path: resolve(__dirname, '../../.env') }) }
  // eslint-disable-next-line no-empty
  catch (_) {}
}

interface Config {
  GOOGLE_CLIENT_ID: string
  GOOGLE_CLIENT_SECRET: string
  GOOGLE_REDIRECT_URI: string
  JWT_SHARED_SECRET: string
  MONGODB_HOST: string
  MONGODB_DATABASE: string
  MONGODB_USERNAME: string
  MONGODB_PASSWORD: string
  NODE_ENV: string
}

export default process.env as unknown as Config
