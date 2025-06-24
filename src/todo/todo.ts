import express, { Request, Response } from "express";
import { ObjectId } from "mongodb";
import { db } from "../app";
import "dotenv/config";
export const todoRouter = express.Router();

todoRouter.post("/addTodo", async (req: Request, res: Response) => {
  const { description, isCompleted } = req.body;

  try {
    const response = await db
      .collection("todo")
      .insertOne({ description, isCompleted });

    res.status(200).json(response);
  } catch (error) {
    res.status(400).send("API error while adding todo");
  }
});

// todoRouter.put("/updateTodo/:id", async (req: Request, res: Response) => {
//   const { id } = req.params;
//   const { description, isCompleted } = req.body;

//   try {
//     const result = await db.collection("todo").updateOne(
//       { _id: new ObjectId(id) },
//       { $set: { description, isCompleted } }
//     );

//     if (result.modifiedCount === 0) {
//       return res.status(404).json({ message: "Todo not found or not updated" });
//     }

//     return res.status(200).json({ message: "Todo updated successfully" });
//   } catch (error) {
//     console.error("Update error:", error);
//     return res.status(500).json({ message: "API error while updating todo" });
//   }
// });

// todoRouter.delete("/deleteTodo/:id", async (req: Request, res: Response) => {
//   const { id } = req.params;

//   try {
//     const result = await db.collection("todo").deleteOne({ _id: new ObjectId(id) });

//     if (result.deletedCount === 0) {
//       return res.status(404).json({ message: "Todo not found" });
//     }

//     res.status(200).json({ message: "Todo deleted successfully" });
//   } catch (error) {
//     console.error("Delete error:", error);
//     res.status(500).json({ message: "API error while deleting todo" });
//   }
// });

export default todoRouter;
