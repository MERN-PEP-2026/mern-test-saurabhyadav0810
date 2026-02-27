import express from "express";
import Task from "../model/task.js";
 import { authMiddleware } from "../middleware/authMiddleware.js";

 const router = express.Router();
 router.use(authMiddleware);
 
 router.post("/", async (req, res) => {
     const task = await Task.create(req.body);
     res.json(task);
    });

router.get("/", async (req, res) => {
  const tasks = await Task.find();
  res.json(tasks);
});



router.put("/:id", async (req, res) => {
  const task = await Task.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(task);
});


router.delete("/:id", async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.json({ message: "Task deleted" });
});

export default router;