import express, { Request, Response } from "express";
import fs from "fs-extra";
import useRouter from "./user/user";

const app = express();
const port = 4201;
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("hello");
});
app.use("/", useRouter);
app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});
