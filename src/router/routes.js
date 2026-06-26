import { Router } from "express";

const router = Router();

router.get("/ping", async (req, res) => {
  res.json({ code: 200, message: "ok" });
});

router.get("/status", async (req, res) => {
  console.log(`${new Date().toString()}`);
  res.json({
    code: 200,
    message: "ok",
    date: new Date(),
    dateStr: new Date().toString(),
  });
});
export default router;
