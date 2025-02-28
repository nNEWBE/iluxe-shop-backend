import { Router } from "express";
import { AuthRoutes } from "../modules/auth/auth.route";
import { UserRoutes } from "../modules/user/user.route";

const router = Router();
const moduleRoutes = [
    {
        path: "/auth",
        router: AuthRoutes
    },
    {
        path:"/users",
        router:UserRoutes
    }
];

moduleRoutes.forEach(route => {
    router.use(route.path, route.router);
});

export default router;