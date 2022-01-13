import express from "express";
import router from "./src/router/index.js";
import dotenv from "dotenv";

dotenv.config();
const app = express();
import deserializeUser from "./src/middlewares/deserializeUser.js";
import connect from "./src/db/connect.js";

const port = process.env.PORT;
const host = process.env.HOST;

app.use(express.json());
app.use(deserializeUser);

app.listen(port, host, () => {
  connect();
  console.log(`Server listening at http://${host}:${port}`);

  app.use("/v1", router);
});
