const express = require("express");
const {
  getTask,
  addTask,
  updateTask,
} = require("../contollers/taskControllers");
const { authUser } = require("../middleware/auth");
const router = express.Router();

router.post("/addTask/:id", authUser, addTask);
router.get("/getTask/:id", authUser, getTask);
router.put("/updateTask/:taskId", authUser, updateTask);

module.exports = router;
