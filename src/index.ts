import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { sessionsRouter } from "./routes/sessions";
import { contentsRouter } from "./routes/contents";

dotenv.config();

const app = express();
const PORT = process.env.PORT ?? 4000;

app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "OPTIONS"],
  }),
);

app.use(express.json());

app.use("/api/contents", contentsRouter);
app.use("/api/sessions", sessionsRouter);

app.get("/", (_req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`✅ Backend running on http://localhost:${PORT}`);
});
