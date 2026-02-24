import { Router } from "express";
import { getAllModels, getModelProviders, getProviders } from "./model.controller.js";

const route = Router();

route.get("/", getAllModels);
route.get("/providers", getProviders);
route.get("/:id/providers", getModelProviders);

export default route;