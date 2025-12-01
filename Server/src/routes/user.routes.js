import { Router } from "express";
import { loginUser, refreshAccessToken, registerUser, logoutUser, getUsers } from "../controllers/user.controllers.js"
import { verifyJWT } from "../middlewares/verifyJWT.js";

const router = Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/validate", refreshAccessToken);   
router.post("/logout", verifyJWT, logoutUser);
router.get("/getUsers", verifyJWT, getUsers);

export default router; 