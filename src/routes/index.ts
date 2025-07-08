import { Router } from "express";
import userRoutes from "./user.routes";
import courseRoutes from "./course.routes";
import enrollmentRoutes from "./enrollment.routes";
import paymentRoutes from "./payment.routes";

const rootRouter = Router();


rootRouter.use("/auth", userRoutes)
rootRouter.use("/course", courseRoutes)
rootRouter.use("/enrollment", enrollmentRoutes)
rootRouter.use("/payment", paymentRoutes)

export default rootRouter;
