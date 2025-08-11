import { Router } from "express";
import authRouter from "./auth.route";
import userRouter from "./user.route";
import productRouter from "./product.route";

const router: Router = Router();

router.get("/", (req, res) => {
  res.send("Welcome to the BE LOGIN API");
});

router.use(authRouter);
router.use(userRouter);
router.use(productRouter);

export default router;
