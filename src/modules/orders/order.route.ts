import { Router } from 'express';
import { OrderController } from './order.controller';
import validateRequest from '../../middlewares/validateRequest';
import { OrderValidations } from './order.validation';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';

const router = Router();
router.post('/create-order', auth(USER_ROLE.user), validateRequest(OrderValidations.createOrderValidationSchema), OrderController.createOrder);
router.get("/verify", OrderController.verifyPayment);
router.get('/', OrderController.getAllOrders);
router.get('/user-orders/:userId', OrderController.getSingleUserOrders);
router.get('/revenue', OrderController.calculateRevenue);
router.patch('/update-order-status/:orderId', validateRequest(OrderValidations.updateOrderStatusValidationSchema), OrderController.updateOrderStatus);
router.delete('/delete-order/:orderId', OrderController.deleteOrder);

export const OrderRoutes = router;