import { Router } from 'express';
import * as projectController from '../controllers/projectControllers';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = Router();

router.get("/projects", authMiddleware, projectController.getAllProjects);
router.post("/project", authMiddleware, projectController.createProject);
router.get("/project/:slug", authMiddleware, projectController.getProjectBySlug);
router.put("/project/:id", authMiddleware, projectController.updateProject);
router.delete("/project/:id", authMiddleware, projectController.deleteProject);

export default router;
