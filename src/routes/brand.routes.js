import express from 'express';
import { createBrand, deleteBrand, getAllBrand } from '../controllers/brand.controller.js';
import { verifyJWT } from '../middlewares/auth.middlewares.js';

const brandRouter = express.Router();

brandRouter.route('/').get(verifyJWT, getAllBrand);
brandRouter.route('/create').post(verifyJWT, createBrand);
brandRouter.route('/remove/:brandId').delete(verifyJWT, deleteBrand);

export default brandRouter;
