import Supplier from '../models/supplier.model.js';
import { ApiError, ApiResponse, asyncHandler } from '../utils/index.js';

// create a new Supplier to database
const createSupplier = asyncHandler(async (req, res) => {
    const { name, address, phone } = req.body;

    if (!(name && address && phone)) {
        throw new ApiError(400, 'Required fields missing');
    }

    const supplier = await Supplier.create({ name, address, phone });

    if (!supplier) {
        throw new ApiError(500, 'Something went wrong while creating supplier to the database');
    }

    return res.status(201).json(new ApiResponse(201, supplier, 'Supplier created successfully'));
});

// fetched all suppliers from the database
const getAllSuppliers = asyncHandler(async (req, res) => {
    const suppliers = await Supplier.find({});

    if (!suppliers) {
        throw new ApiError(500, 'Something went wrong while faceting the supplier');
    }

    return res.status(200).json(new ApiResponse(200, suppliers, 'Suppliers fetched successfully'));
});

// remove the supplier from the database
const deleteSupplier = asyncHandler(async (req, res) => {
    const { supplierId } = req.params;

    if (!supplierId.trim()) {
        throw new ApiError(400, 'Supplier id required');
    }

    const result = await Supplier.findByIdAndDelete(supplierId);

    if (!result) {
        throw new ApiError(404, 'Supplier not found');
    }

    return res.status(200).json(new ApiResponse(200, result, 'Supplier deleted successfully'));
});

export { createSupplier, deleteSupplier, getAllSuppliers };
