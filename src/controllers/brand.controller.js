import Brand from '../models/brand.model.js';
import { ApiError, ApiResponse, asyncHandler } from '../utils/index.js';

// create a new new brand
const createBrand = asyncHandler(async (req, res) => {
    const { name, origin } = req.body;

    if (!name || !origin) {
        throw new ApiError(400, 'Required fields missing');
    }

    const brand = await Brand.create({
        name,
        origin,
    });

    if (!brand) {
        throw new ApiError(500, 'Something went wrong while creating the brand in database');
    }

    return res.status(201).json(new ApiResponse(201, brand, 'Brand created successfully'));
});

// remove the brand from the database
const deleteBrand = asyncHandler(async (req, res) => {
    const { brandId } = req.params;

    if (!brandId) {
        throw new ApiError(400, 'Brand id is required');
    }

    const result = await Brand.findByIdAndDelete(brandId);

    if (!result) {
        throw new ApiError(500, 'Something went wrong while deleting the brand from the database');
    }

    return res.status(200).json(new ApiResponse(200, result, 'Brand deleted successfully'));
});

// get all the brand
const getAllBrand = asyncHandler(async (req, res) => {
    const brands = await Brand.find({});

    if (!brands) {
        throw new ApiError(500, 'Something went wrong when fetching brand list');
    }

    return res.status(200).json(new ApiResponse(200, brands, 'Brand fetched successfully'));
});

export { createBrand, deleteBrand, getAllBrand };
