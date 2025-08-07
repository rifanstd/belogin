import { Router } from "express";
import authRouter from "./auth.route";
import userRouter from "./user.route";

const router: Router = Router();

router.get("/", (req, res) => {
  res.send("Welcome to the API");
});

router.use("/auth", authRouter);
router.use("/users", userRouter);

export default router;
