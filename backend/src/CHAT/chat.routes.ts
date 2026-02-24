import { Router } from "express";
import { getChatResponse } from "./char.controller.js";

const route = Router();

route.get("/completions", getChatResponse);

export default route;