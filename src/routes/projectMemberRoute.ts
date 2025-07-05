import { Router } from 'express';
import * as projectMemberController from '../controllers/projectMemberControllers';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = Router();
router.get("/project-members", authMiddleware, projectMemberController.getAllProjectMembers);
router.post("/project-member", authMiddleware, projectMemberController.createProjectMember);
router.get("/project-member/:id", authMiddleware, projectMemberController.getProjectMemberById);
router.delete("/project-member/:id", authMiddleware, projectMemberController.deleteProjectMember);

export default router;
