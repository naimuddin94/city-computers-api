import express from 'express';
import {
    cartStatusUpdate,
    createCart,
    getAllCarts,
    pendingCarts,
} from '../controllers/cart.controllers.js';
import { verifyJWT, verifyManager } from '../middlewares/auth.middlewares.js';

const cartRouter = express.Router();

cartRouter.route('/').get(verifyJWT, verifyManager, getAllCarts);
cartRouter.route('/pending').get(verifyJWT, verifyManager, pendingCarts);
cartRouter.route('/status').put(verifyJWT, verifyManager, cartStatusUpdate);
cartRouter.route('/create').post(verifyJWT, createCart);

export default cartRouter;
