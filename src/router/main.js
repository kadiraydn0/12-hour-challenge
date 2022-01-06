import { Router } from "express";

const router = Router();

router.get("/", () => {
  console.log("mrb");
});

export default router;
