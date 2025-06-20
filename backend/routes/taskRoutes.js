const express =require("express");
const {protect, adminOnly} =require("../middlewares/authMiddleware");
const { getDashboardData, getUserDashboardData,
     getTask, getTaskById, createTask,
      updateTask, deleteTask, updateTaskStatus, 
      updateTaskChecklist } = require("../controllers/taskController");

const router =express.Router();
// task Management Routes

router.get("/dashboard-data", protect, getDashboardData);
router.get("/user-dashboard-data", protect, getUserDashboardData);
router.get("/", protect, getTask); //get all user(admin:all, user:assigned);
router.get("/:id", protect, getTaskById); //get task by id
router.post("/", protect, adminOnly, createTask); //create task(admin only)
router.put("/:id", protect, updateTask);//update task details
router.delete("/:id", protect,adminOnly, deleteTask); //delete task (admin only)
router.put("/:id/status", protect ,updateTaskStatus); //update task status
router.put("/:id/todo", protect, updateTaskChecklist); //update task checklist

module.exports=router;
