import express from 'express';
import { authRoutes } from '../modules/auth/auth.route';
import { ServiceRoutes } from '../modules/service/service.route';
import { cleaningProductRoutes } from '../modules/cleaningProduct/cleaningProduct.route';
import { BookingRoutes } from '../modules/booking/booking.route';

const router = express.Router();

const moduleRoutes = [
  {
    path: '/auth',
    route: authRoutes,
  },
  {
    path: '/service',
    route: ServiceRoutes,
  },
  {
    path: '/cleaningproduct',
    route: cleaningProductRoutes,
  },
  {
    path: '/booking',
    route: BookingRoutes,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));
export default router;
