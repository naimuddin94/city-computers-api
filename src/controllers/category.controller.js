/* eslint-disable prettier/prettier */
import Category from '../models/category.model.js';
import { ApiError, ApiResponse, asyncHandler } from '../utils/index.js';

// create a new new category
const createCategory = asyncHandler(async (req, res) => {
    const { name } = req.body;

    if (!name.trim()) {
        throw new ApiError(400, 'Name is required');
    }

    const category = await Category.create({
        name: name.trim(),
    });

    if (!category) {
        throw new ApiError(500, 'Something went wrong while creating the category in database');
    }

    return res.status(201).json(new ApiResponse(201, category, 'Category created successfully'));
});

// remove the category from the database
const deleteCategory = asyncHandler(async (req, res) => {
    const { categoryId } = req.params;

    if (!categoryId) {
        throw new ApiError(400, 'Category id is required');
    }

    const result = await Category.findByIdAndDelete(categoryId);

    if (!result) {
        throw new ApiError(
            500,
            'Something went wrong while deleting the category from the database',
        );
    }

    return res.status(200).json(new ApiResponse(200, result, 'Category deleted successfully'));
});

// get all the categories
const getAllCategories = asyncHandler(async (req, res) => {
    const categories = await Category.find({});

    if (!categories) {
        throw new ApiError(500, 'Something went wrong when fetching category list');
    }

    return res.status(200).json(new ApiResponse(200, categories, 'Category fetched successfully'));
});

export { createCategory, deleteCategory, getAllCategories };
