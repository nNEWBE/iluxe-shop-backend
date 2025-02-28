import { Router } from "express";
import { AuthControllers } from "./auth.controller";
import { UserValidation } from "../user/user.validation";
import validateRequest from "../../middlewares/validateRequest";
import { AuthValidation } from "./auth.validation";

const router = Router();

router.post('/register', validateRequest(UserValidation.registerUserValidationSchema), AuthControllers.registerUser)
router.post('/login', validateRequest(UserValidation.loginUserValidationSchema), AuthControllers.loginUser)
router.post(
    '/refresh-token',
    validateRequest(AuthValidation.refreshTokenValidationSchema),
    AuthControllers.refreshToken,
);

export const AuthRoutes = router;