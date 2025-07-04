import { Router } from 'express';
import * as taskController from '../controllers/task.controller';
import { createTaskValidator, updateTaskValidator } from '../validators/task.validator';
import { validate } from '../middlewares/validate.middleware';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = Router();

router.get("/tasks", authMiddleware, taskController.getAllTasksController);
router.post("/task", authMiddleware, createTaskValidator, validate, taskController.createTaskController);
router.get("/task/:id", authMiddleware, taskController.getTaskByIdController);
router.put("/task/:id", authMiddleware, updateTaskValidator, validate, taskController.updateTaskController);
router.delete("/task/:id", authMiddleware, taskController.deleteTaskController);

export default router;

