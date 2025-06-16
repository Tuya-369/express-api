import express, { Request, Response } from "express";
import fs from "fs-extra";
const app = express();
const port = 4201;
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send({
    name: "testName",
    age: "1",
    id: 1,
  });
});

app.post("/user", (req: Request, res: Response) => {
  const { name, age }: { name: string; age: number } = req.body;
  res.json({ message: `User  ${name} is ${age} years old.` });
});

app.put("/updateUser", (req: Request, res: Response) => {
  const { name, age }: { name: string; age: number } = req.body;
  res.send(`updated user ${name} ${age}`);
});

app.delete("/deleteUser", (req: Request, res: Response) => {
  const { userId } = req.body;
  res.send(`deleted user id ${userId}`);
});

app.post("/createUser", (req: Request, res: Response) => {
  const { name, age, userName, userEmail, phoneNumber, password }: User =
    req.body;

  fs.writeFileSync(
    "./user.json",
    JSON.stringify([
      {
        name,
        age,
        userName,
        userEmail,
        phoneNumber,
        password,
      },
    ])
  );

  res.send("Successfully created User");
});

app.get("/users", (req: Request, res: Response) => {
  const users = fs.readFileSync("./user.json", { encoding: "utf8", flag: "r" });
  res.json(JSON.parse(users));
});

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});
