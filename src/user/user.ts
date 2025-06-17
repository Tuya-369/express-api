import express, { Request, Response } from "express";
import fs from "fs-extra";
import { User } from "../type/index";
import { nanoid } from "nanoid";
const useRouter = express.Router();

useRouter.get("/users", (req: Request, res: Response) => {
  const users = fs.readFileSync("./user.json", { encoding: "utf8", flag: "r" });
  res.json(JSON.parse(users));
});

// useRouter.delete("/deleteUser", (req: Request, res: Response) => {
//   const { userId } = req.body;
//   users = users.filter()
//   res.send(`deleted user id ${userId}`);
// });
useRouter.post("/createUser", (req: Request, res: Response) => {
  const { name, age, userName, userEmail, phoneNumber, password }: User =
    req.body;
  const filePath = "./user.json";
  const unicId = nanoid();
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
    userName,
    userEmail,
    phoneNumber,
    password,
    userId: unicId,
  });
  deleteUser = JSON.parse(existingData).filter(
    (users) => User.userId !== userId
  );
});

export default useRouter;

// useRouter.put("/updateUser", (req: Request, res: Response) => {
//   const { name, age }: { name: string; age: number } = req.body;
//   res.send(`updated user ${name} ${age}`);
// });
// useRouter.delete("/deleteUser", (req: Request, res: Response) => {
//   const { userId } = req.body;
//   res.send(`deleted user id ${userId}`);
// });
// useRouter.post("/createUser", (req: Request, res: Response) => {
//   const { name, age, userName, userEmail, phoneNumber, password }: User =
//     req.body;
//   fs.writeFileSync(
//     "./user.json",
//     JSON.stringify([
//       {
//         name,
//         age,
//         userName,
//         userEmail,
//         phoneNumber,
//         password,
//       },
//     ])
//   );
//   res.send("Successfully created User");
// });
// useRouter.get("/users", (req: Request, res: Response) => {
//   const users = fs.readFileSync("./user.json", { encoding: "utf8", flag: "r" });
//   res.json(JSON.parse(users));
// });
