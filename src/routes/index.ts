import { Router } from "express";
import userRoutes from "./user.routes";

const rootRouter = Router();


rootRouter.use("/auth", userRoutes)

export default rootRouter;
