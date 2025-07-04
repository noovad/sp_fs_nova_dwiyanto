import { Router } from 'express';
import * as userController from '../controllers/user.controllers';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = Router();

router.post("/user", authMiddleware, userController.createUser);
router.get("/users", authMiddleware, userController.getAllUsers);
router.get("/user/:id", authMiddleware, userController.getUserById);
router.put("/user/:id", authMiddleware, userController.updateUser);
router.delete("/user/:id", authMiddleware, userController.deleteUser);

export default router;
