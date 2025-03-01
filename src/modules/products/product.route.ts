import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { ProductValidation } from "./product.validation";
import { ProductControllers } from "./product.controller";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "../user/user.constant";

const router = Router();

router.post('/create',auth(USER_ROLE.user),validateRequest(ProductValidation.createProductValidationSchema), ProductControllers.createStationaryProduct)
router.get('/', ProductControllers.getAllStationaryProducts)
router.get('/:productId', ProductControllers.getSingleStationaryProduct)
router.patch('/:productId',auth(USER_ROLE.admin,USER_ROLE.user),validateRequest(ProductValidation.updateProductValidationSchema), ProductControllers.updateStationaryProduct)
router.delete('/:productId', ProductControllers.deleteStationaryProduct)

export const ProductRoutes = router