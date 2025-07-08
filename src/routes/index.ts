import { Router } from "express";
import userRoutes from "./user.routes";
import courseRoutes from "./course.routes";

const rootRouter = Router();


rootRouter.use("/auth", userRoutes)
rootRouter.use("/course", courseRoutes)

export default rootRouter;
