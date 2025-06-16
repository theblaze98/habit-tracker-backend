import { pgTable, text, timestamp, uuid, boolean } from 'drizzle-orm/pg-core'
import { relations, InferSelectModel, InferInsertModel } from 'drizzle-orm'
import { users } from './user.schema'
import { habitLogs } from './habit-log.schema'

export const habits = pgTable('habits', {
  id: uuid('id').primaryKey(),
  userId: uuid('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  name: text('name').notNull(),
  description: text('description'),
  frequency: text('frequency').notNull(), // e.g., 'daily', 'weekly'
  createdAt: timestamp('created_at').defaultNow(),
  archived: boolean('archived').default(false),
})

export const habitsRelations = relations(habits, ({ one, many }) => ({
  user: one(users, { fields: [habits.userId], references: [users.id] }),
  logs: many(habitLogs),
}))

export type Habit = InferSelectModel<typeof habits>
export type HabitCreate = InferInsertModel<typeof habits>
export type HabitUpdate = Partial<Omit<Habit, 'id' | 'createdAt'>>
