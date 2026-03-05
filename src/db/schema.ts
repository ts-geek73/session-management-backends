import {
  pgTable,
  uuid,
  text,
  timestamp,
  varchar,
  pgEnum,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

export const statusEnum = pgEnum("session_status", ["active", "complete"]);

export const contents = pgTable("contents", {
  id: uuid("id").primaryKey().defaultRandom(),
  title: varchar("title", { length: 255 }).notNull(),
  content: text("content"),
  created_at: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});

export const contentsRelations = relations(contents, ({ many }) => ({
  sessions: many(sessions),
}));

export const sessions = pgTable("sessions", {
  id: uuid("id").primaryKey().defaultRandom(),
  content_id: uuid("content_id")
    .references(() => contents.id, { onDelete: "cascade" })
    .notNull(),
  status: statusEnum("status").default("active").notNull(),
  created_at: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});

export const sessionsRelations = relations(sessions, ({ one }) => ({
  contents: one(contents, {
    fields: [sessions.content_id],
    references: [contents.id],
  }),
}));
