import express from "express";
import mongoose from "mongoose";
import Task from "./schema/taskSchema.js";
import cors from "cors";

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors());

mongoose
  .connect("mongodb://localhost:27017/todoList")
  .then(() => console.log("connection was succesfull"))
  .catch((error) => console.log(error));

app.post("/api/task", async (req, res) => {
  const task = req.body.task;
  const doc = new Task({
    task,
    completed: false,
  });
  try {
    await doc.save();
    const allTask = await Task.find({});
    res.status(200).send(allTask);
  } catch (err) {
    console.error("Error saving document:", err);
    res.status(500).json({ msg: "Error saving document", error: err.message });
  }
});

app.get("/api/task", async (req, res) => {
  try {
    const allTask = await Task.find({});
    res.status(200).send(allTask);
  } catch (error) {
    res.sendStatus(404).send(error);
  }
});

app.delete("/api/task/:id", async (req, res) => {
  const ParstId = req.params.id;
  try {
    const deletedPost = await Task.findOneAndDelete(
      {
        _id: ParstId,
      },
      { new: true }
    );

    if (!deletedPost) {
      return res.status(404).json({
        msg: "task not founded",
      });
    }

    return res.status(200).json({
      msg: "task was deleted",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "couldn`t get the task",
    });
  }
});

app.patch("/api/task/:id", async (req, res) => {
  const parstId = req.params.id;
  try {
    const updatedTask = await Task.findByIdAndUpdate(
      {
        _id: parstId,
      },

      { completed: true }
    );

    if (!updatedTask) {
      return res.status(404).json({
        msg: "task not founded",
      });
    }
    return res.status(200).json({
      msg: "task was upgraded",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "couldn`t get the task",
    });
  }
});

app.listen(PORT, () => {
  console.log("server was started");
});
