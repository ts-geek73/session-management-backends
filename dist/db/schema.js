"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sessionsRelations = exports.sessions = exports.contentsRelations = exports.contents = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
const drizzle_orm_1 = require("drizzle-orm");
exports.contents = (0, pg_core_1.pgTable)("contents", {
    id: (0, pg_core_1.uuid)("id").primaryKey().defaultRandom(),
    title: (0, pg_core_1.varchar)("title", { length: 255 }).notNull(),
    content: (0, pg_core_1.text)("content"),
    created_at: (0, pg_core_1.timestamp)("created_at", { withTimezone: true })
        .defaultNow()
        .notNull(),
});
exports.contentsRelations = (0, drizzle_orm_1.relations)(exports.contents, ({ many }) => ({
    sessions: many(exports.sessions),
}));
exports.sessions = (0, pg_core_1.pgTable)("sessions", {
    id: (0, pg_core_1.uuid)("id").primaryKey().defaultRandom(),
    content_id: (0, pg_core_1.uuid)("content_id")
        .references(() => exports.contents.id, { onDelete: "cascade" })
        .notNull(),
    status: (0, pg_core_1.varchar)("status", { length: 50 }).default("active").notNull(),
    created_at: (0, pg_core_1.timestamp)("created_at", { withTimezone: true })
        .defaultNow()
        .notNull(),
});
exports.sessionsRelations = (0, drizzle_orm_1.relations)(exports.sessions, ({ one }) => ({
    contents: one(exports.contents, {
        fields: [exports.sessions.content_id],
        references: [exports.contents.id],
    }),
}));
