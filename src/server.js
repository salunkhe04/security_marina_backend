import "dotenv/config";
import express from "express";
import connectDatabase from "./config/database.js";
import config from "./config/config.js";
import cors from "cors";
import router from "./router/routes.js";

connectDatabase();
export const app = express();

app.use(cors());
app.use(express.json({ limit: "128mb" }));
app.use(express.urlencoded({ limit: "128mb", extended: true }));
app.set("trust proxy", 1);

app.use("/", router);


app.listen(config.PORT, () =>
  console.log("listening on port " + config.PORT),
);

// new branch
