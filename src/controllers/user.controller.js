/* eslint-disable prettier/prettier */
// dependencies
import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';
import {
  ApiError,
  ApiResponse,
  asyncHandler,
  fileUploadOnCloudinary,
  options,
} from '../utils/index.js';

// generate access and refresh tokens
const generateAccessAndRefreshTokens = async (userId) => {
  try {
    const user = await User.findById(userId);
    if (!user) {
      throw new ApiError(404, 'User not found');
    }

    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(500, 'Something went wrong generating tokens');
  }
};

// create a new user
const registerUser = asyncHandler(async (req, res) => {
  const { fullName, email, password } = req.body;

  if (!fullName || !email || !password) {
    throw new ApiError(400, 'Required field missing');
  }

  const isExistUser = await User.findOne({ email });

  if (isExistUser) {
    throw new ApiError(400, 'Email already exists');
  }

  let image;

  if (req.file && req.file?.mimetype?.includes('image/') && req.file?.buffer) {
    image = await fileUploadOnCloudinary(req.file?.buffer);
  }

  if (!image) {
    throw new ApiError(400, 'Image file required');
  }

  const user = await User.create({
    fullName,
    email,
    image,
    password,
  });

  const createdUser = await User.findById(user?._id).select(
    '-password -refreshToken',
  );

  if (!createdUser) {
    throw new ApiError(500, 'Something went wrong while creating account');
  }

  return res
    .status(201)
    .json(new ApiResponse(201, createdUser, 'Account created successfully'));
});

// login user
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new ApiError(400, 'Email and password are required');
  }

  const user = await User.findOne({ email });

  if (!user) {
    throw new ApiError(404, 'User not found');
  }

  const isValidPassword = await user.isPasswordCorrect(password);

  if (!isValidPassword) {
    throw new ApiError(403, 'Invalid password');
  }

  const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(
    user._id,
  );

  return res
    .cookie('accessToken', accessToken, options)
    .cookie('refreshToken', refreshToken, options)
    .status(200)
    .json(new ApiResponse(200, user, 'Login successfully'));
});

// user logout functionality
const logoutUser = asyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(
    req.user._id,
    {
      $unset: {
        refreshToken: 1, // this removes the field from document
      },
    },
    { new: true },
  );

  return res
    .status(200)
    .clearCookie('accessToken', options)
    .clearCookie('refreshToken', options)
    .json(new ApiResponse(200, {}, 'User logged Out'));
});

// refresh token
const userRefreshToken = asyncHandler(async (req, res) => {
  const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken;

  if (!incomingRefreshToken) {
    throw new ApiError(401, 'unauthorized request');
  }

  try {
    const decodedToken = jwt.verify(
      incomingRefreshToken,
      process.env.REFRESH_TOKEN_SECRET,
    );
    const user = await User.findById(decodedToken?._id);

    if (!user) {
      throw new ApiError(401, 'Invalid refresh token');
    }

    if (incomingRefreshToken !== user?.refreshToken) {
      throw new ApiError(401, 'Refresh token is expired or used');
    }

    const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(
      user._id,
    );

    return res
      .status(200)
      .cookie('accessToken', accessToken, options)
      .cookie('refreshToken', refreshToken, options)
      .json(
        new ApiResponse(
          200,
          { accessToken, refreshToken },
          'Access token refreshed',
        ),
      );
  } catch (error) {
    throw new ApiError(401, error?.message || 'Invalid refresh token');
  }
});

// update user password
const updatePassword = asyncHandler(async (req, res) => {
  const { oldPassword, newPassword } = req.body;

  const user = await User.findById(req?.user?._id);

  const isPasswordCorrect = await user.isPasswordCorrect(oldPassword);

  if (!isPasswordCorrect) {
    throw new ApiError(400, 'Invalid old password');
  }

  user.password = newPassword;
  await user.save({ validateBeforeSave: false });

  return res
    .status(200)
    .json(new ApiResponse(200, {}, 'Password changed successfully'));
});

// update user avatar
const updateImage = asyncHandler(async (req, res) => {
  let image;

  if (req.file && req.file?.mimetype?.includes('image/') && req.file?.buffer) {
    image = await fileUploadOnCloudinary(req.file?.buffer);
  }

  if (!image) {
    throw new ApiError(400, 'Image file required');
  }

  const user = await User.findByIdAndUpdate(
    req.user?._id,
    {
      $set: {
        image,
      },
    },
    { new: true },
  ).select('-password -refreshToken');

  if (!user) {
    throw new ApiError(500, 'Something went wrong while updating avatar');
  }

  return res
    .status(200)
    .json(new ApiResponse(200, user, 'Avatar image updated successfully'));
});

export {
  loginUser,
  logoutUser,
  registerUser,
  updateImage,
  updatePassword,
  userRefreshToken,
};
