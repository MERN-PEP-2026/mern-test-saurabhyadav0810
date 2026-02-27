import express from "express";
import Task from "../model/task.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();
router.use(authMiddleware);

router.post("/", async (req, res) => {
  try {
    const { title, description, status } = req.body;
    
    if (!title || title.trim() === "") {
      return res.status(400).json({ message: "Title is required" });
    }
    
    const task = await Task.create({
      title,
      description,
      status: status || "pending",
      createdBy: req.user.id
    });
    res.json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const tasks = await Task.find({ createdBy: req.user.id });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, createdBy: req.user.id },
      req.body,
      { new: true }
    );
    
    if (!task) {
      return res.status(404).json({ message: "Task not found or not authorized" });
    }
    
    res.json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      createdBy: req.user.id
    });
    
    if (!task) {
      return res.status(404).json({ message: "Task not found or not authorized" });
    }
    
    res.json({ message: "Task deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;