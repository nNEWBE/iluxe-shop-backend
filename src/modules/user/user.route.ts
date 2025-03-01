import { Router } from "express";
import { UserController } from "./user.controller";
import validateRequest from "../../middlewares/validateRequest";
import { UserValidations } from "./user.validation";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "./user.constant";

const router = Router();

router.get('/', UserController.getAllUsers)
router.patch('/change-status/:id', validateRequest(UserValidations.blockUserValidationSchema), UserController.blockUser)
router.get('/me', auth(USER_ROLE.admin, USER_ROLE.user), UserController.getMe)

export const UserRoutes = router