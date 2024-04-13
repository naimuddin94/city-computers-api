import express from 'express';
import {
    createSupplier,
    deleteSupplier,
    getAllSuppliers,
} from '../controllers/supplier.controller.js';
import { verifyJWT } from '../middlewares/auth.middlewares.js';

const supplierRouter = express.Router();

supplierRouter.route('/create').post(verifyJWT, createSupplier);
supplierRouter.route('/').get(verifyJWT, getAllSuppliers);
supplierRouter.route('/remove').delete(verifyJWT, deleteSupplier);

export default supplierRouter;
