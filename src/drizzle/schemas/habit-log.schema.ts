import { pgTable, uuid, boolean, date, text } from 'drizzle-orm/pg-core'
import { relations, InferSelectModel, InferInsertModel } from 'drizzle-orm'
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

export type HabitLog = InferSelectModel<typeof habitLogs>
export type HabitLogCreate = InferInsertModel<typeof habitLogs>
export type HabitLogUpdate = Partial<Omit<HabitLog, 'id' | 'createdAt'>>
