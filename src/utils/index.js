/* eslint-disable object-curly-newline */
import ApiError from './ApiError.js';
import ApiResponse from './ApiResponse.js';
import asyncHandler from './asyncHandler.js';
import fileUploadOnCloudinary from './cloudinary.js';
import globalErrorHandler from './globalErrorHandler.js';

// jwt options
const options = {
    httpOnly: true,
    secure: true,
};

export { ApiError, ApiResponse, asyncHandler, fileUploadOnCloudinary, globalErrorHandler, options };
