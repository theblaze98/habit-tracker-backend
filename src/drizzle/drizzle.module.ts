import { Module } from '@nestjs/common'
import { drizzle } from 'drizzle-orm/neon-http'
import { DRIZZLE_PROVIDER } from '@/consts'
import * as schemas from './schemas'

@Module({
  providers: [
    {
      provide: `${DRIZZLE_PROVIDER}`,
      useFactory: () =>
        drizzle(process.env.NEON_DB_URL as string, {
          schema: schemas,
        }),
    },
  ],
})
export class DrizzleModule {}
