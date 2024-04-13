import express from 'express';
import {
    createSubCategory,
    deleteSubCategory,
    getAllSubCategory,
    getSubCategoriesByCategory,
} from '../controllers/subCategory.controller.js';
import { verifyJWT } from '../middlewares/auth.middlewares.js';

const subCategoryRouter = express.Router();

subCategoryRouter.route('/').get(verifyJWT, getAllSubCategory);
subCategoryRouter.route('/:categoryId').get(verifyJWT, getSubCategoriesByCategory);
subCategoryRouter.route('/create').post(verifyJWT, createSubCategory);
subCategoryRouter.route('/remove/:subCategoryId').delete(verifyJWT, deleteSubCategory);

export default subCategoryRouter;
