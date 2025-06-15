import { config as dotenvConfig } from 'dotenv'
dotenvConfig({ path: '.env.local' })
import { defineConfig } from 'drizzle-kit'

export default defineConfig({
  schema: ['src/drizzle/schemas/*.ts'],
  dialect: 'postgresql',
  strict: true,
  verbose: true,
  out: 'drizzle-migrations',
  dbCredentials: {
    url: process.env.NEON_DB_URL as string,
  },
})
