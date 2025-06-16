import { Inject } from '@nestjs/common'
import { NeonHttpDatabase } from 'drizzle-orm/neon-http'
import { eq, or } from 'drizzle-orm'
import * as schemas from '@/drizzle/schemas'
import { IUser } from './interface'
import { UserCreate, UserUpdate } from '@/drizzle/schemas'
import { IRepository } from '@/interfaces/repository.interface'
import { DRIZZLE_PROVIDER } from '@/consts'

export class UsersRepository
  implements IRepository<IUser, UserCreate, UserUpdate>
{
  constructor(
    @Inject(DRIZZLE_PROVIDER)
    private readonly db: NeonHttpDatabase<typeof schemas>,
  ) {}

  async create(user: UserCreate): Promise<IUser> {
    const [createdUser] = await this.db
      .insert(schemas.users)
      .values(user)
      .returning()
    return createdUser
  }

  async find(query?: Partial<IUser>): Promise<IUser[]> {
    if (!query || Object.keys(query).length === 0) {
      return await this.db.select().from(schemas.users)
    }

    const columns = schemas.users._.columns as Record<string, any>

    const conditions = Object.entries(query)
      .filter(([, value]) => value !== undefined)
      .map(([key, value]) => eq(columns[key], value))

    return await this.db
      .select()
      .from(schemas.users)
      .where(or(...conditions))
  }

  async findOne(query: { id?: string; email?: string }): Promise<IUser | null> {
    const user = await this.db.query.users.findFirst({
      where: or(
        query.id ? eq(schemas.users.id, query.id) : undefined,
        query.email ? eq(schemas.users.email, query.email) : undefined,
      ),
    })

    return user || null
  }

  async update(id: string, user: UserUpdate): Promise<IUser> {
    const [updatedUser] = await this.db
      .update(schemas.users)
      .set(user)
      .where(eq(schemas.users.id, id))
      .returning()
    return updatedUser
  }

  async delete(id: string): Promise<boolean> {
    const deleted = await this.db
      .delete(schemas.users)
      .where(eq(schemas.users.id, id))
    return !!deleted
  }
}
