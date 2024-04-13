import express from 'express';
import multer from 'multer';
import {
    createProduct,
    deleteProduct,
    getAllProducts,
    getSingleProduct,
    updateProductApproval,
    updateProductImages,
    updateProductOfferPrice,
    updateProductStock,
} from '../controllers/product.controller.js';
import { verifyAdmin, verifyJWT } from '../middlewares/auth.middlewares.js';

const upload = multer({});

const productRouter = express.Router();

productRouter.route('/').get(verifyJWT, getAllProducts);
productRouter.route('/create').post(verifyJWT, upload.array('images'), createProduct);
productRouter.route('/:productId').get(verifyJWT, getSingleProduct);
productRouter.route('/remove/:productId').delete(verifyJWT, deleteProduct);
productRouter
    .route('/images/:productId')
    .put(verifyJWT, upload.array('images'), updateProductImages);
productRouter.route('/update-offer-price/:productId').put(verifyJWT, updateProductOfferPrice);
productRouter.route('/update-stock/:productId').put(verifyJWT, updateProductStock);
productRouter
    .route('/update-approval/:productId')
    .put(verifyJWT, verifyAdmin, updateProductApproval);

export default productRouter;
