import express, { Request, response, Response } from "express";
import fs from "fs-extra";
import { Db, MongoClient } from "mongodb";
import userRouter from "./user/user";

const app = express();
const port = 4201;

let db: Db;
// app.use("/", userRouter);
const uri = "mongodb+srv://admin:test123@cluster0.ecluklf.mongodb.net/";
const connectdb = async () => {
  console.log("hi");

  try {
    const client = new MongoClient(uri);
    await client.connect();
    db = client.db("sample_mflix");
    console.log("database");
  } catch (error) {
    console.log(error);

    return error;
  }
};

app.get("/", async (req: Request, res: Response) => {
  try {
    const response = db.collection("userstest").find();
    const users = await response.toArray();
    res.json(users);
  } catch (error) {
    console.log(error);

    res.send("error");
  }
});

// app.post("/addUser", async (req, res) => {
//   try {
//     const response = db
//       .collection("users")
//       .insertOne({ name: "John Doe", age: 32 });
//     res.json((await response).insertedId.getTimestamp());
//   } catch (error) {
//     console.log(error);
//   }
// });
app.listen(port, async () => {});
console.log(`Example app listening on port http://localhost:${port}`);
connectdb();
