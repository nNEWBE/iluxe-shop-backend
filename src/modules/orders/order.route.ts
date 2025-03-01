import { Router } from 'express';
import { OrderController } from './order.controller';
import validateRequest from '../../middlewares/validateRequest';
import { OrderValidations } from './order.validation';

const router = Router();
router.post('/create-order', validateRequest(OrderValidations.createOrderValidationSchema), OrderController.createOrder);
router.get('/', OrderController.getAllOrders);
router.get('/revenue', OrderController.calculateRevenue);
router.patch('/update-order-status/:orderId', validateRequest(OrderValidations.updateOrderStatusValidationSchema), OrderController.updateOrderStatus);
router.delete('/delete-order/:orderId', OrderController.deleteOrder);

export const OrderRoutes = router;