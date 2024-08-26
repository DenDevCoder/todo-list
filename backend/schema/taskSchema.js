import mongoose, { Schema } from "mongoose";

const taskSchema = new Schema({
  task: String,
  completed: Boolean,
});

export default mongoose.model("Task", taskSchema);
