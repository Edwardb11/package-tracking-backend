import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

import db from "./database/Database.js";
import v1Router from "./routes/index.js";
import { PORT, ORIGIN } from "./database/config.js";

dotenv.config();
const app = express();

try {
  await db.authenticate();
  console.log("Database Connected...");
} catch (error) {
  console.error(error);
}

app.use(
  cors({
    credentials: true,
    origin: ORIGIN,
  })
);
app.use(cookieParser());
app.use(express.json());
app.use("/api/v1", v1Router);

app.listen(PORT, () => console.log(`Server running at port ${PORT}`));
