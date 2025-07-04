import { Router } from 'express';
import * as taskController from '../controllers/task.controller';
import { createTaskValidator, updateTaskValidator } from '../validators/task.validator';
import { validate } from '../middlewares/validate.middleware';

const router = Router();

router.get("/tasks", taskController.getAllTasksController);
router.post("/task", createTaskValidator, validate, taskController.createTaskController);
router.get("/task/:id", taskController.getTaskByIdController);
router.put("/task/:id", updateTaskValidator, validate, taskController.updateTaskController);
router.delete("/task/:id", taskController.deleteTaskController);

export default router;

