import cookieParser from "cookie-parser";
import express, { Application } from "express"
import cors from "cors";
// import router from "./routes";
import notFoundHandler from "./middlewares/notFoundHandler";
import globalErrorHandler from "./middlewares/globalErrorhandler";

const app: Application = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors());
// app.use('/api/',router);
app.get('/',(req,res)=>{
    res.send('Blog Project is running');
})
app.use(globalErrorHandler);
app.use(notFoundHandler);

export default app;