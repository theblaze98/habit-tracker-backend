import { pgTable, varchar, timestamp, uuid } from 'drizzle-orm/pg-core'
import { relations, InferSelectModel, InferInsertModel } from 'drizzle-orm'
import { habits } from './habit.schema'

export const users = pgTable('users', {
  id: uuid('id').primaryKey(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  username: varchar('username', { length: 255 }).notNull(),
  password: varchar('password', { length: 255 }).notNull(),
  createdAt: timestamp('created_at').defaultNow(),
})

export const usersRelations = relations(users, ({ many }) => ({
  habits: many(habits),
}))

export type User = InferSelectModel<typeof users>
export type UserCreate = InferInsertModel<typeof users>
export type UserUpdate = Partial<Omit<User, 'id' | 'createdAt'>>
