/* eslint-disable prettier/prettier */
/* eslint-disable import/extensions */
import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';
import { ApiError, asyncHandler } from '../utils/index.js';

// verify JWT token with secret key
const verifyJWT = asyncHandler(async (req, res, next) => {
  try {
    const token = req.cookies?.accessToken
      || req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
      throw new ApiError(401, 'Unauthorized request');
    }

    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    const user = await User.findById(decodedToken?._id).select(
      '-password -refreshToken',
    );

    if (!user) {
      throw new ApiError(401, 'Invalid access token');
    }

    req.user = user;
    next();
  } catch (error) {
    throw new ApiError(401, error?.message || 'Invalid access token');
  }
});

// verify admin
const verifyAdmin = asyncHandler(async (req, res, next) => {
  if (req.user?.role !== 'admin') {
    throw new ApiError(401, 'Unauthorized access');
  }
  next();
});

// verify manager
const verifyManager = asyncHandler(async (req, res, next) => {
  if (req.user?.role !== 'admin' && req.user?.role !== 'manager') {
    throw new ApiError(401, 'Unauthorized access');
  }
  next();
});

export { verifyAdmin, verifyJWT, verifyManager };
