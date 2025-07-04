import { Router } from 'express';
import * as projectController from '../controllers/project.controllers';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = Router();

router.get("/projects", authMiddleware, projectController.getAllProjects);
router.post("/project", authMiddleware, projectController.createProject);
router.get("/project/:id", authMiddleware, projectController.getProjectById);
router.put("/project/:id", authMiddleware, projectController.updateProject);
router.delete("/project/:id", authMiddleware, projectController.deleteProject);

export default router;
