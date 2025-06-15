import {
  pgTable,
  uuid,
  boolean,
  date,
} from 'drizzle-orm/pg-core'
import { relations } from 'drizzle-orm'
import { habits } from './habit.schema'

export const habitLogs = pgTable('habit_logs', {
  id: uuid('id').primaryKey(),
  habitId: uuid('habit_id')
    .notNull()
    .references(() => habits.id, { onDelete: 'cascade' }),
  date: date('date').notNull(), // día en que se cumplió
  completed: boolean('completed').default(true),
  note: text('note'),
})

export const habitLogsRelations = relations(habitLogs, ({ one }) => ({
  habit: one(habits, { fields: [habitLogs.habitId], references: [habits.id] }),
}))
