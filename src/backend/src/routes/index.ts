import { Router, type IRouter } from "express";
import healthRouter from "./health";
import lifebridgeRouter from "./lifebridge";

const router: IRouter = Router();

router.use(healthRouter);
router.use(lifebridgeRouter);

export default router;
