import { Router } from 'express';
import * as projectController from '../controllers/project.controllers';

const router = Router();

router.get("/projects", projectController.getAllProjects);
router.post("/project", projectController.createProject);
router.get("/project/:id", projectController.getProjectById);
router.put("/project/:id", projectController.updateProject);
router.delete("/project/:id", projectController.deleteProject);

export default router;
