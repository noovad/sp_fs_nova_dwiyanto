import { Router } from 'express';
import * as authController from '../controllers/auth.controllers';
import { guestMiddleware } from '../middlewares/guest.middleware';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = Router();

router.post("/register", guestMiddleware, authController.register);
router.post("/login", guestMiddleware, authController.login);
router.post("/logout", authMiddleware, authController.logout);

export default router;
