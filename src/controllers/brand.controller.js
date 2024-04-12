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

export { createBrand };
