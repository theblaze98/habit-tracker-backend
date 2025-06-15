// db/schema.ts
import { pgTable, varchar, timestamp, uuid } from 'drizzle-orm/pg-core'
import { relations } from 'drizzle-orm'
import { habits } from './habit.schema'

export const users = pgTable('users', {
  id: uuid('id').primaryKey(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  username: varchar('username', { length: 255 }).notNull(),
  createdAt: timestamp('created_at').defaultNow(),
})

export const usersRelations = relations(users, ({ many }) => ({
  habits: many(habits),
}))
