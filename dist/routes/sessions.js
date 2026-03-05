"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sessionsRouter = void 0;
const express_1 = require("express");
const db_1 = require("../db/db");
const schema_1 = require("../db/schema");
const drizzle_orm_1 = require("drizzle-orm");
exports.sessionsRouter = (0, express_1.Router)();
exports.sessionsRouter.get("/", async (_req, res) => {
    try {
        const data = await db_1.db.query.sessions.findMany({
            with: {
                contents: {
                    columns: {
                        title: true,
                    },
                },
            },
            orderBy: [(0, drizzle_orm_1.desc)(schema_1.sessions.created_at)],
        });
        return res.json({ success: true, data });
    }
    catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
});
exports.sessionsRouter.post("/track", async (req, res) => {
    const { content_id, status } = req.body;
    if (!content_id) {
        return res
            .status(400)
            .json({ success: false, message: "Missing content_id" });
    }
    try {
        await db_1.db.insert(schema_1.sessions).values({
            content_id,
            status: status || "active",
            created_at: new Date(),
        });
        return res.json({ success: true });
    }
    catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
});
