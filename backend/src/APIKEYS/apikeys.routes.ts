import { Router } from "express";
import { requireAuth } from "../middleware/authMiddleware.js";
import { createApiKey, deleteApiKey, getApiKeys, updateApiKey } from "./apikeys.controller.js";

const route = Router();

route.post("/", requireAuth, createApiKey);
route.get("/", requireAuth, getApiKeys);
route.put("/", requireAuth, updateApiKey);
route.delete("/", requireAuth, deleteApiKey);

export default route;