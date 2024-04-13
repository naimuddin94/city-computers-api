/* eslint-disable prettier/prettier */
import SubCategory from '../models/subCategory.model.js';
import { ApiError, ApiResponse, asyncHandler } from '../utils/index.js';

// create a new new sub category
const createSubCategory = asyncHandler(async (req, res) => {
    const { name, category } = req.body;

    if (!name.trim() || !category.trim()) {
        throw new ApiError(400, 'Required fields missing');
    }

    const subCategory = await SubCategory.create({
        name: name.trim(),
        category,
    });

    if (!subCategory) {
        throw new ApiError(500, 'Something went wrong while creating the sub category in database');
    }

    return res
        .status(201)
        .json(new ApiResponse(201, subCategory, 'Sub category created successfully'));
});

// remove sub category from the database
const deleteSubCategory = asyncHandler(async (req, res) => {
    const { subCategoryId } = req.params;

    if (!subCategoryId) {
        throw new ApiError(400, 'Brand id is required');
    }

    const result = await SubCategory.findByIdAndDelete(subCategoryId);

    if (!result) {
        throw new ApiError(
            500,
            'Something went wrong while deleting sub category from the database',
        );
    }

    return res.status(200).json(new ApiResponse(200, result, 'Sub category deleted successfully'));
});

// get all sub categories
const getAllSubCategory = asyncHandler(async (req, res) => {
    const subCategories = await SubCategory.find({});

    if (!subCategories) {
        throw new ApiError(500, 'Something went wrong when fetching sub category list');
    }

    return res
        .status(200)
        .json(new ApiResponse(200, subCategories, 'Sub category fetched successfully'));
});

// get sub categories by category id
const getSubCategoriesByCategory = asyncHandler(async (req, res) => {
    const { categoryId } = req.params;

    if (!categoryId) {
        throw new ApiError(400, 'Category id is required');
    }

    const subCategories = await SubCategory.find({ category: categoryId });

    if (!subCategories) {
        throw new ApiError(404, 'Sub Category not found');
    }

    return res.status(200).json(new ApiResponse(200, subCategories, 'Sub categories fetched successfully'));
});

export {
    createSubCategory,
    deleteSubCategory,
    getAllSubCategory,
    getSubCategoriesByCategory,
};
