const TaskModel = require("../models/TaskModel");

exports.addTask = async (req, res) => {
  const userId = req.user.id;
  try {
    const task = await new TaskModel({
      task: req.body.task,
      user: userId,
    }).save();
    return res.status(201).json({ message: "Task added successfully" });
  } catch (error) {
    return res.status(500).json(error.message);
  }
};
exports.getTask = async (req, res) => {
  const userId = req.user.id;

  try {
    const tasks = await TaskModel.find({ user: userId });

    return res.status(200).json(tasks);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};
//Update Task
exports.updateTask = async (req, res) => {
  const userId = req.user.id;
  const taskId = req.params.taskId;
  const checked = req.body.checked;
  try {
    const task = await TaskModel.findOne({ _id: taskId, user: userId });

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    task.checked = checked;
    await task.save();

    return res.status(200).json({ message: "Task updated successfully" });
  } catch (error) {
    return res.status(500).json(error.message);
  }
};
