import { Router } from 'express';
import * as userController from '../controllers/userControllers';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = Router();

router.get("/users", authMiddleware, userController.getAllUsers);
router.get("/me", authMiddleware, userController.getMeByEmail);
router.delete("/user/:id", authMiddleware, userController.deleteUser);

export default router;
