import express from 'express';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../../enums/role';
import { RatingController } from './rating.controller';

const router = express.Router();

router.post('/', auth(ENUM_USER_ROLE.CUSTOMER), RatingController.makeRating);

router.get('/:serviceId', RatingController.getRating);

export const ReviewRoutes = router;
