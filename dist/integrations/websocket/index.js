"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initWebSocket = void 0;
const db_1 = require("../../db/db");
const schema_1 = require("../../db/schema");
const drizzle_orm_1 = require("drizzle-orm");
const initWebSocket = (io) => {
    console.log("🔌 Initializing WebSockets with Postgres LISTEN/NOTIFY...");
    io.on("connection", (socket) => {
        console.log(`📡 New client connected: ${socket.id}`);
        socket.on("disconnect", () => {
            console.log(`🔌 Client disconnected: ${socket.id}`);
        });
    });
    db_1.client.listen("session_change", async (payload) => {
        try {
            const data = JSON.parse(payload);
            console.log("📫 Postgres notification received:", data);
            const { eventType, new: newRow } = data;
            if (eventType === "INSERT" || eventType === "UPDATE") {
                const detailedSession = await db_1.db.query.sessions.findFirst({
                    where: (0, drizzle_orm_1.eq)(schema_1.sessions.id, newRow.id),
                    with: {
                        contents: {
                            columns: {
                                title: true,
                            },
                        },
                    },
                });
                if (detailedSession) {
                    if (eventType === "INSERT") {
                        console.log("🚀 Emitting session_created", detailedSession.id);
                        io.emit("session_created", detailedSession);
                    }
                    else {
                        console.log("🔄 Emitting session_updated", detailedSession.id);
                        io.emit("session_updated", detailedSession);
                    }
                }
            }
        }
        catch (error) {
            console.error("❌ Error handling Postgres notification:", error);
        }
    });
    console.log("👂 Listening on 'session_change' Postgres channel.");
};
exports.initWebSocket = initWebSocket;
