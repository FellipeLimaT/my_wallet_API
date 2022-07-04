import { Router } from 'express';
import { allTransactions, addTransaction, deleteTransaction } from './../controllers/accountController.js';
import verifyToken from './../middlewares/verifyTokenMiddleware.js';

const accountRouter = Router();

accountRouter.get("/account", verifyToken, allTransactions);
accountRouter.post("/account", verifyToken, addTransaction);
accountRouter.delete("/account", verifyToken, deleteTransaction);

export default accountRouter;