import { Router } from 'express';
import * as taskController from '../controllers/taskController';
import { createTaskValidator, updateTaskValidator } from '../validators/task.validator';
import { validate } from '../middlewares/validate.middleware';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = Router();

router.get("/tasks/:id", authMiddleware, taskController.getAllTasksController);
router.post("/task", authMiddleware, createTaskValidator, validate, taskController.createTaskController);
router.put("/task/:id", authMiddleware, updateTaskValidator, validate, taskController.updateTaskController);
router.delete("/task/:id", authMiddleware, taskController.deleteTaskController);

export default router;

