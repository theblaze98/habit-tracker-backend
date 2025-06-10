import { Module } from '@nestjs/common'
import { DrizzleModule } from './drizzle/drizzle.module'
import { CommonModule } from './common/common.module'

@Module({
  imports: [DrizzleModule, CommonModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
