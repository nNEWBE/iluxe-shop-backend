import cookieParser from "cookie-parser";
import express, { Application } from "express"
import cors from "cors";
import notFoundHandler from "./middlewares/notFoundHandler";
import globalErrorHandler from "./middlewares/globalErrorhandler";
import router from "./routes";

const app: Application = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: ['http://localhost:5173', 'http://localhost:5173', 'https://iluxe-shop-frontend.vercel.app'], credentials: true }));
app.use('/api', router);
app.get('/', (req, res) => {
    res.send('iLuxe shop is running');
})
app.use(globalErrorHandler);
app.use(notFoundHandler);

export default app;