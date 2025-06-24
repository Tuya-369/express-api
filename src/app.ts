import express, { Request, Response } from "express";
import userRouter from "./user/user";
import { Db, MongoClient } from "mongodb";
import "dotenv/config";
import todoRouter from "./todo/todo";

const app = express();
const port = 4201;

app.use(express.json());

export let db: Db;

app.use("/", userRouter);

app.use("/", todoRouter);

const connectDb = async () => {
  try {
    const client = new MongoClient(process.env.MONGO_URI!);
    await client.connect();
    db = client.db("test");
    console.log("Database connected");
    return client;
  } catch (error) {
    return error;
  }
};

app.get("/", async (req: Request, res: Response) => {

  const responses = db.collection("users").find();


  const users = await responses.toArray();

  res.json(users);
});

app.post("/addUser", async (req: Request, res: Response) => {
  try {
    const response = db
      .collection("users")
      .insertOne({ name: "John Doe", age: 3200 });

    res.json((await response).insertedId);
  } catch (error) {
    console.log(error);
  }
});

app.listen(port, async () => {
  await connectDb();

  console.log(`Example app listening on port http://localhost:${port}`);
});

// yarn add mongodb
