import { Module } from '@nestjs/common'
import { DrizzleModule } from './drizzle/drizzle.module'
import { CommonModule } from './common/common.module'
import { UsersModule } from './users/users.module';

@Module({
  imports: [DrizzleModule, CommonModule, UsersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
