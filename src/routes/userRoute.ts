import { Router } from 'express';
import * as userController from '../controllers/user.controllers';

const router = Router();

router.get("/users", userController.getAllUsers);
router.post("/user", userController.createUser);
router.get("/user/:id", userController.getUserById);
router.put("/user/:id", userController.updateUser);
router.delete("/user/:id", userController.deleteUser);

export default router;
