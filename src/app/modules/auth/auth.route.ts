import express from 'express';
import validateRequest from '../../middlewares/ValidateRequest';

const router = express.Router();


router.post('/register',validateRequest())

export const authRouter = router;
