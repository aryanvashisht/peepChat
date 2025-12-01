import { Router } from "express";
import { getMessage, sendMessage } from "../controllers/message.controllers.js";
import { verifyJWT } from "../middlewares/verifyJWT.js";

const router = Router();

router.post("/sendMessage/:id",verifyJWT, sendMessage)
router.get("/getMessage/:id",verifyJWT, getMessage)

export default router;