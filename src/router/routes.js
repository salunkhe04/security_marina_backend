import { Router } from "express";
import visitor from "./visitor/visitor.js";
import appUpdateModel from "../model/appUpdate.js";
import { errorRes2 } from "../middlewares/response.js";

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

router.get("/app-update", async (req, res, next) => {
  const { appName } = req.query;
  try {
    //
    const resp = await appUpdateModel.findOne({ appName: appName });
    if (!resp) return errorRes2(res, 404, "No App found");
    return successRes2(res, 200, "app found", { data: resp });
  } catch (error) {
    //
    return errorRes2(res, 500, `${error}`);
  }
});

router.get("/", async (req, res) => {
  res.json({
    code: 200,
    message: "ok",
  });
});


router.get("/health", (req, res) => {
  res.send(`Handled by port ${process.env.PORT}`);
});
router.use(visitor);
export default router;
