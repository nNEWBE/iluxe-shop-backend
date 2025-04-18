import { NextFunction, Request, Response, Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { ProductValidations } from "./product.validation";
import { ProductControllers } from "./product.controller";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "../user/user.constant";
import { upload } from "../../utils/sendImageToCloudinary";

const router = Router();

router.post('/create', upload.single('file'),
    (req: Request, res: Response, next: NextFunction) => {
        req.body = JSON.parse(req.body.data);
        next();
    }, auth(USER_ROLE.user, USER_ROLE.admin), validateRequest(ProductValidations.createProductValidationSchema), ProductControllers.createStationaryProduct)
router.get('/', ProductControllers.getAllStationaryProducts)
router.get('/all', ProductControllers.getAllStationaryProductsWithoutQuery)
router.get('/:productId', ProductControllers.getSingleStationaryProduct)
router.patch('/:productId', auth(USER_ROLE.admin, USER_ROLE.user), validateRequest(ProductValidations.updateProductValidationSchema), ProductControllers.updateStationaryProduct)
router.delete('/:productId', ProductControllers.deleteStationaryProduct)

export const ProductRoutes = router