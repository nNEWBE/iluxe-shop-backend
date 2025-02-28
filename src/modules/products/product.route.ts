import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { ProductValidation } from "./product.validation";

const router = Router();

router.post('/create',validateRequest(ProductValidation.createProductValidationSchema), )