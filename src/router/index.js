import { Router } from "express";
import captain from "./captain";

const router = Router();

router.use("/captain", captain);

export default router;
