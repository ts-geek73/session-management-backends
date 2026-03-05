"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const http_1 = require("http");
const socket_io_1 = require("socket.io");
const sessions_1 = require("./routes/sessions");
const contents_1 = require("./routes/contents");
const integrations_1 = require("./integrations");
dotenv_1.default.config();
const app = (0, express_1.default)();
const httpServer = (0, http_1.createServer)(app);
const io = new socket_io_1.Server(httpServer, {
    cors: {
        origin: ["http://localhost:3000"],
        methods: ["GET", "POST", "OPTIONS"],
    },
});
const PORT = process.env.PORT ?? 4000;
app.use((0, cors_1.default)({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "OPTIONS"],
}));
app.use(express_1.default.json());
app.use("/api/contents", contents_1.contentsRouter);
app.use("/api/sessions", sessions_1.sessionsRouter);
app.get("/", (_req, res) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
});
// Initialize WebSocket integration
(0, integrations_1.initWebSocket)(io);
httpServer.listen(PORT, () => {
    console.log(`✅ Backend running on http://localhost:${PORT}`);
});
