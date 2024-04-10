/* eslint-disable prettier/prettier */
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

export { loginUser, registerUser };
