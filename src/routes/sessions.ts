import { Request, Response, Router } from "express";
import { db } from "../db/db";
import { sessions } from "../db/schema";
import { desc, eq } from "drizzle-orm";

export const sessionsRouter = Router();

sessionsRouter.get("/", async (_req: Request, res: Response) => {
  try {
    const data = await db.query.sessions.findMany({
      with: {
        contents: {
          columns: {
            title: true,
          },
        },
      },
      orderBy: [desc(sessions.created_at)],
    });

    return res.json({ success: true, data });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
});

sessionsRouter.post("/track", async (req: Request, res: Response) => {
  const { content_id, status } = req.body;

  if (!content_id) {
    return res
      .status(400)
      .json({ success: false, message: "Missing content_id" });
  }

  try {
    await db.insert(sessions).values({
      content_id,
      status: status || "active",
      created_at: new Date(),
    });

    return res.json({ success: true });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
});

sessionsRouter.patch("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!status) {
    return res
      .status(400)
      .json({ success: false, message: "Missing status field" });
  }

  const allowedStatuses = ["active", "reviewed", "archived"];
  if (!allowedStatuses.includes(status)) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid status value" });
  }

  try {
    await db.update(sessions).set({ status }).where(eq(sessions.id, id));

    return res.json({ success: true, message: "Session updated" });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
});
