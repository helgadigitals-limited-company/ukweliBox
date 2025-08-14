import { sql } from 'drizzle-orm'
import { boolean, integer, pgTable, serial, text, timestamp, uuid, varchar } from 'drizzle-orm/pg-core'

export const users = pgTable('users', {
  id: uuid('id').primaryKey().default(sql`gen_random_uuid()`),
  name: varchar('name', { length: 255 }).notNull(),
  email: varchar('email', { length: 255 }).unique(),
  phone_number: varchar('phone_number', { length: 50 }),
  created_at: timestamp('created_at').defaultNow(),
})

export const admins = pgTable('admins', {
  id: uuid('id').primaryKey().default(sql`gen_random_uuid()`),
  username: varchar('username', { length: 255 }).notNull().unique(),
  password_hash: varchar('password_hash', { length: 255 }).notNull(),
  created_at: timestamp('created_at').defaultNow(),
})

export const submissionTypes = pgTable('submission_types', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 100 }).notNull().unique(),
})

export const submissionStatus = pgTable('submission_status', {
  id: serial('id').primaryKey(),
  status_name: varchar('status_name', { length: 50 }).notNull().unique(),
})

export const submissions = pgTable('submissions', {
  id: uuid('id').primaryKey().default(sql`gen_random_uuid()`),
  user_id: uuid('user_id').notNull(),
  submission_type_id: integer('submission_type_id').notNull(),
  title: varchar('title', { length: 255 }),
  description: text('description').notNull(),
  priority: integer('priority').default(0),
  status_id: integer('status_id').references(() => submissionStatus.id),
  created_at: timestamp('created_at').defaultNow(),
  updated_at: timestamp('updated_at').defaultNow(),
})

export const submissionFiles = pgTable('submission_files', {
  id: uuid('id').primaryKey().default(sql`gen_random_uuid()`),
  submission_id: uuid('submission_id').notNull().references(() => submissions.id),
  file_name: varchar('file_name', { length: 255 }).notNull(),
  file_type: varchar('file_type', { length: 50 }).notNull(),
  file_url: text('file_url').notNull(),
  created_at: timestamp('created_at').defaultNow(),
})

export const feedbackResponses = pgTable('feedback_responses', {
  id: uuid('id').primaryKey().default(sql`gen_random_uuid()`),
  submission_id: uuid('submission_id').notNull().references(() => submissions.id),
  admin_id: uuid('admin_id').notNull().references(() => admins.id),
  message: text('message').notNull(),
  created_at: timestamp('created_at').defaultNow(),
})

export const notifications = pgTable('notifications', {
  id: uuid('id').primaryKey().default(sql`gen_random_uuid()`),
  user_id: uuid('user_id').notNull().references(() => users.id),
  message: text('message').notNull(),
  read: boolean('read').default(false),
  created_at: timestamp('created_at').defaultNow(),
})
