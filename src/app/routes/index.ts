import express from 'express';
import { AuthRoutes } from '../modules/auth/customer/auth.route';
import { BookingRoutes } from '../modules/booking/booking.route';
import { CleaningProductRoutes } from '../modules/cleaningProduct/cleaningProduct.route';
import { ServiceRoutes } from '../modules/service/service.route';
import { AdminRoutes } from '../modules/auth/admin/admin.route';

const router = express.Router();

const moduleRoutes = [
  {
    path: '/auth/customer',
    route: AuthRoutes,
  },
  {
    path: '/auth/admin',
    router: AdminRoutes,
  },
  {
    path: '/service',
    route: ServiceRoutes,
  },
  {
    path: '/cleaningproduct',
    route: CleaningProductRoutes,
  },
  {
    path: '/booking',
    route: BookingRoutes,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));
export default router;
