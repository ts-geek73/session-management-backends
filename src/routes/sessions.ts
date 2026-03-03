import { Request, Response, Router } from "express";
import { supabase } from "../lib/supabase";

export const sessionsRouter = Router();

// GET /api/sessions - List all tracked sessions
sessionsRouter.get("/", async (_req: Request, res: Response) => {
  const { data, error } = await supabase
    .from("sessions")
    .select(
      `
      *,
      contents (
        title
      )
    `,
    )
    .order("created_at", { ascending: false });

  if (error) {
    return res.status(500).json({ success: false, message: error.message });
  }

  return res.json({ success: true, data });
});

// POST /api/sessions/track - Track a content visit (session)
sessionsRouter.post("/track", async (req: Request, res: Response) => {
  const { content_id, status } = req.body;

  if (!content_id) {
    return res
      .status(400)
      .json({ success: false, message: "Missing content_id" });
  }
  // const { data } = await supabase
  //   .from("sessions")
  //   .select("*")
  //   .eq("content_id", content_id);

  // if (data && data?.length > 0) {
  //   return res
  //     .status(400)
  //     .json({ success: false, message: "Session already exists" });
  // }

  const { error } = await supabase.from("sessions").insert([
    {
      content_id,
      status: status || "active",
      created_at: new Date().toISOString(),
    },
  ]);

  if (error) {
    return res.status(500).json({ success: false, message: error.message });
  }

  return res.json({ success: true });
});
