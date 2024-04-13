import express from 'express';
import {
    createSupplier,
    deleteSupplier,
    getAllSuppliers,
    getSingleSupplier,
} from '../controllers/supplier.controller.js';
import { verifyJWT } from '../middlewares/auth.middlewares.js';

const supplierRouter = express.Router();

supplierRouter.route('/create').post(verifyJWT, createSupplier);
supplierRouter.route('/').get(verifyJWT, getAllSuppliers);
supplierRouter.route('/remove/:supplierId').delete(verifyJWT, deleteSupplier);
supplierRouter.route('/:supplierId').get(verifyJWT, getSingleSupplier);

export default supplierRouter;
