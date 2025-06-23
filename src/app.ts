import express from "express";
import { Db, MongoClient } from "mongodb";

const app = express();
app.use(express.json());

let db: Db;

const url = "mongodb+srv://Tuya:Tuyanaa1216@cluster0.0kjypdr.mongodb.net/";

const client = new MongoClient(url);

async function connectToDb() {
  try {
    await client.connect();
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  }
}

function getDb() {
  //db gees awah
  return client.db("sample_mflix");
}

app.get("/", async (req, res) => {
  const response = db.collection("sessions").find();
  const users = await response.toArray();
  res.json(users);
});
app.post("/addUser", async (req, res) => {
  try {
    const client = new MongoClient(url);
    await client.connect();
    const database = client.db("users");
    const response = database
      .collection("users")
      .insertOne({ name: "tuya", age: 21 });
    console.log("inserted");
    console.log((await response).insertedId);
    res.json();
  } catch (error) {
    console.log(error);
  }
});
connectToDb().then(() => {
  db = getDb();
  app.listen(3000, () => {
    console.log(`Server running on port ${3000}`);
  });
});
