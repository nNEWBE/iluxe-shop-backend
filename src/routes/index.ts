import { Router } from "express";
import { AuthRoutes } from "../modules/auth/auth.route";
import { UserRoutes } from "../modules/user/user.route";
import { ProductRoutes } from "../modules/products/product.route";
import { OrderRoutes } from "../modules/orders/order.route";

const router = Router();
const moduleRoutes = [
    {
        path: "/auth",
        router: AuthRoutes
    },
    {
        path: "/users",
        router: UserRoutes
    },
    {
        path: "/products",
        router: ProductRoutes
    },
    {
        path: "/orders",
        router: OrderRoutes
    }
];

moduleRoutes.forEach(route => {
    router.use(route.path, route.router);
});

export default router;