import express from "express";
import morgan from "morgan";
import { AppDataSource } from "./data-source";
import authRoutes from "./routes/auth";
import subsRoutes from "./routes/subs";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
dotenv.config();

const app = express();
const origin = process.env.ORIGIN;
app.use(express.json());
app.use(morgan("dev"));
app.use(cookieParser());
app.use(
  cors({
    origin,
    credentials: true, // get cookie
  })
);
app.get("/", (_, res) => res.send("running"));
app.use("/api/auth", authRoutes);
app.use("/api/subs", subsRoutes);
app.use(express.static("public"));

app.listen(process.env.PORT, async () => {
  console.log(`server running at ${origin}`);
  console.log(`server running at ${process.env.APP_URL}`);

  AppDataSource.initialize()
    .then(() => {
      console.log("database initialized");
    })
    .catch((error) => console.log(error));
});
