import express from 'express';
import { AdminController } from './admin.controller';

const router = express.Router();

router.post('/register', AdminController.adminRegistration);
router.post('/login', AdminController.adminLogin);

export const AdminRoutes = router;
