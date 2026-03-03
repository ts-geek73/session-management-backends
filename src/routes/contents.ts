import { Router, Request, Response } from "express";
import { supabase } from "../lib/supabase";

export const contentsRouter = Router();

// GET /api/contents - List all contents
contentsRouter.get("/", async (_req: Request, res: Response) => {
  const { data, error } = await supabase
    .from("contents")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return res.status(500).json({ success: false, message: error.message });
  }

  return res.json({ success: true, data });
});

// GET /api/contents/:id - Get single content
contentsRouter.get("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;

  const { data, error } = await supabase
    .from("contents")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    const status = error.code === "PGRST116" ? 404 : 500;
    return res.status(status).json({ success: false, message: error.message });
  }

  return res.json({ success: true, data });
});
