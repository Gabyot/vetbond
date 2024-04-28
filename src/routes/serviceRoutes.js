import { Router } from "express";
import { getAllServices } from "../controllers/serviceController.js";

const router = Router();

router.get('/services', getAllServices);

export default router;