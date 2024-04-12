import express from 'express';
import {
    createCategory,
    deleteCategory,
    getAllCategories,
} from '../controllers/category.controller.js';
import { verifyJWT } from '../middlewares/auth.middlewares.js';

const categoryRouter = express.Router();

categoryRouter.route('/').get(verifyJWT, getAllCategories);
categoryRouter.route('/create').post(verifyJWT, createCategory);
categoryRouter.route('/remove/:categoryId').delete(verifyJWT, deleteCategory);

export default categoryRouter;
