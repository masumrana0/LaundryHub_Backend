import express from 'express';
import { BookingRoutes } from '../modules/booking/booking.route';
import { CleaningProductRoutes } from '../modules/cleaningProduct/cleaningProduct.route';
import { ServiceRoutes } from '../modules/service/service.route';
import { AdminRoutes } from '../modules/auth/admin/admin.route';
import { CustomerthRoutes } from '../modules/auth/customer/customer.route';
import { AuthRoutes } from '../modules/auth/auth.route';

const router = express.Router();

const moduleRoutes = [
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/auth/customer',
    route: CustomerthRoutes,
  },
  {
    path: '/auth/admin',
    route: AdminRoutes,
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
