import express, { Request, Response } from "express";
import fs from "fs-extra";
import { User } from "../type/index";
import { nanoid } from "nanoid";

const userRouter = express.Router();

userRouter.get("/users", (req: Request, res: Response) => {
  const users = fs.readFileSync("./user.json", { encoding: "utf8", flag: "r" });
  res.json(JSON.parse(users));
});

userRouter.post("/createUser", (req: Request, res: Response) => {
  const { name, age, userName, userEmail, phoneNumber, password }: User =
    req.body;

  const uniqueId = nanoid();

  const filePath = "./user.json";

  let users: User[] = [];

  if (fs.existsSync(filePath)) {
    const existingData = fs.readFileSync(filePath, "utf8");
    if (existingData.trim().length > 0) {
      users = JSON.parse(existingData);
    }
  }

  users.push({
    name,
    age,
    userId: uniqueId,
    userName,
    userEmail,
    phoneNumber,
    password,
  });

  fs.writeFileSync(filePath, JSON.stringify(users, null, 2));

  res.send("Successfully created User");
});

userRouter.post("/deleteUser", (req: Request, res: Response) => {
  const { userId } = req.body;
  const existingData = fs.readFileSync("./user.json", "utf8");

  const deletedUser = JSON.parse(existingData).filter(
    (user: any) => user.userId !== userId
  );

  fs.writeFileSync("./user.json", JSON.stringify(deletedUser, null, 2));

  res.json({
    userId,
  });
});

userRouter.put("/updateUser", (req: Request, res: Response) => {
  const { name, age, userId }: { name: string; age: number; userId: string } =
    req.body;
  const existingData = fs.readFileSync("./user.json", "utf8");

  const updatedUser = JSON.parse(existingData).map((user: any) => {
    if (user.userId === userId) {
      return { ...user, name: name, age: age };
    }
  });

  fs.writeFileSync("./user.json", JSON.stringify(updatedUser, null, 2));

  res.json(updatedUser);
});

export default userRouter;
