"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.contentsRouter = void 0;
const express_1 = require("express");
const db_1 = require("../db/db");
const schema_1 = require("../db/schema");
const drizzle_orm_1 = require("drizzle-orm");
exports.contentsRouter = (0, express_1.Router)();
exports.contentsRouter.get("/", async (_req, res) => {
    try {
        const data = await db_1.db
            .select()
            .from(schema_1.contents)
            .orderBy((0, drizzle_orm_1.desc)(schema_1.contents.created_at));
        return res.json({ success: true, data });
    }
    catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
});
exports.contentsRouter.get("/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const data = await db_1.db
            .select()
            .from(schema_1.contents)
            .where((0, drizzle_orm_1.eq)(schema_1.contents.id, id))
            .limit(1);
        if (data.length === 0) {
            return res
                .status(404)
                .json({ success: false, message: "Content not found" });
        }
        return res.json({ success: true, data: data[0] });
    }
    catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
});
