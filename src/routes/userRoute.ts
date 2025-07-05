import { Router } from 'express';
import * as userController from '../controllers/userControllers';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = Router();

router.post("/user", authMiddleware, userController.createUser);
router.get("/users", authMiddleware, userController.getAllUsers);
router.get("/me", authMiddleware, userController.getMeByEmail);
router.delete("/user/:id", authMiddleware, userController.deleteUser);

export default router;
