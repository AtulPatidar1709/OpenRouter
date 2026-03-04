import { Router } from "express";
import { getWalletTransactionController } from "./wallet.controller.js";
import { requireAuth } from "../middleware/authMiddleware.js";

const route = Router();

route.get("/", requireAuth, getWalletTransactionController);

export default route;
