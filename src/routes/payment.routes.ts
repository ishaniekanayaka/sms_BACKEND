import express from "express";
import {authorizeRoles, verifyToken} from "../middlewares/auth";
import {createPayment} from "../controllers/PaymentController";
import {authenticateToken} from "../middlewares/authenticateToken";


const router = express.Router();

router.use(authenticateToken)
router.post("/", authorizeRoles("student"), createPayment);

export default router;
