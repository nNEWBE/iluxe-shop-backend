import { Router } from "express";
import { AuthControllers } from "./auth.controller";
import { UserValidations } from "../user/user.validation";
import validateRequest from "../../middlewares/validateRequest";
import { AuthValidations } from "./auth.validation";

const router = Router();

router.post('/register', validateRequest(UserValidations.registerUserValidationSchema), AuthControllers.registerUser)
router.post('/login', validateRequest(UserValidations.loginUserValidationSchema), AuthControllers.loginUser)
router.post(
    '/refresh-token',
    validateRequest(AuthValidations.refreshTokenValidationSchema),
    AuthControllers.refreshToken,
);

export const AuthRoutes = router;