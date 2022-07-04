import { Router } from 'express';
import { signUp, loginToken, loginEmail } from './../controllers/authController.js';
import verifyToken from './../middlewares/verifyTokenMiddleware.js';

const authRouter = Router();

authRouter.post("/signUp", signUp);
authRouter.get("/login", verifyToken, loginToken);
authRouter.post("/login", loginEmail);

export default authRouter;