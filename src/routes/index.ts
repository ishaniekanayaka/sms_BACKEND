import { Router } from "express";
import userRoutes from "./user.routes";
import courseRoutes from "./course.routes";
import enrollmentRoutes from "./enrollment.routes";

const rootRouter = Router();


rootRouter.use("/auth", userRoutes)
rootRouter.use("/course", courseRoutes)
rootRouter.use("/enrollment", enrollmentRoutes)

export default rootRouter;
