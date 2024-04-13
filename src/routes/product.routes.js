import express from 'express';
import multer from 'multer';
import { createProduct } from '../controllers/product.controller.js';
import { verifyJWT } from '../middlewares/auth.middlewares.js';

const upload = multer({});

const productRouter = express.Router();

productRouter.route('/create').post(verifyJWT, upload.array('images'), createProduct);

export default productRouter;
