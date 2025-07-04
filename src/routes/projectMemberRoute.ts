import { Router } from 'express';
import * as projectMemberController from '../controllers/projectMember.controllers';

const router = Router();

router.get("/project-members", projectMemberController.getAllProjectMembers);
router.post("/project-member", projectMemberController.createProjectMember);
router.get("/project-member/:id", projectMemberController.getProjectMemberById);
router.delete("/project-member/:id", projectMemberController.deleteProjectMember);

export default router;
