import { Router, Request, Response } from "express";
import { db } from "../db/db";
import { contents } from "../db/schema";
import { desc, eq } from "drizzle-orm";

export const contentsRouter = Router();

contentsRouter.get("/", async (_req: Request, res: Response) => {
  try {
    const data = await db
      .select()
      .from(contents)
      .orderBy(desc(contents.created_at));
    return res.json({ success: true, data });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
});

contentsRouter.get("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const data = await db
      .select()
      .from(contents)
      .where(eq(contents.id, id))
      .limit(1);

    if (data.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Content not found" });
    }

    return res.json({ success: true, data: data[0] });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
});
