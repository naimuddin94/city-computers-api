/* eslint-disable comma-dangle */
/* eslint-disable prettier/prettier */
/* eslint-disable operator-linebreak */
import Product from '../models/product.model.js';
import {
  ApiError,
  ApiResponse,
  asyncHandler,
  fileUploadOnCloudinary,
} from '../utils/index.js';

// create a new product
const createProduct = asyncHandler(async (req, res) => {
  const {
    name,
    subCategory,
    brand,
    price,
    offerPrice,
    purchasePrice,
    stocks,
    features,
    description,
    supplier,
  } = req.body;

  if (
    !(
      name?.trim() &&
      subCategory?.trim() &&
      brand?.trim() &&
      price &&
      purchasePrice &&
      features &&
      description?.trim() &&
      supplier?.trim()
    )
  ) {
    throw new ApiError(400, 'Required fields missing');
  }

  const images = [];

  if (
    req.files &&
    req.files[0]?.mimetype?.includes('image/') &&
    req.files[0]?.buffer
  ) {
    const imageOne = await await fileUploadOnCloudinary(req.files[0]?.buffer);
    if (imageOne) images.push(imageOne);
  }

  if (
    req.files &&
    req.files[1]?.mimetype?.includes('image/') &&
    req.files[1]?.buffer
  ) {
    const imageTwo = await await fileUploadOnCloudinary(req.files[1]?.buffer);
    if (imageTwo) images.push(imageTwo);
  }

  if (
    req.files &&
    req.files[2]?.mimetype?.includes('image/') &&
    req.files[2]?.buffer
  ) {
    const imageThree = await await fileUploadOnCloudinary(req.files[2]?.buffer);
    if (imageThree) images.push(imageThree);
  }

  const product = await Product.create({
    name,
    images,
    subCategory,
    brand,
    price,
    offerPrice,
    purchasePrice,
    stocks,
    features,
    description,
    addedBy: req.user?._id,
    supplier,
  });

  if (!product) {
    throw new ApiError(
      500,
      'Something went wrong while creating product to the database'
    );
  }

  return res
    .status(201)
    .json(new ApiResponse(201, product, 'Product saved successfully'));
});

// get product from the database
const getSingleProduct = asyncHandler(async (req, res) => {
  const { productId } = req.params;

  if (!productId) {
    throw new ApiError(400, 'Product id is required');
  }

  const result = await Product.findById(productId);

  if (!result) {
    throw new ApiError(404, 'Product not found');
  }

  return res
    .status(200)
    .json(new ApiResponse(200, result, 'Product fetched successfully'));
});

// get all products from database
const getAllProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({});

  if (!products) {
    throw new ApiError(404, 'Product not found');
  }

  return res
    .status(200)
    .json(new ApiResponse(200, products, 'Product fetched successfully'));
});

// remove product from the database
const deleteProduct = asyncHandler(async (req, res) => {
  const { productId } = req.params;

  if (!productId) {
    throw new ApiError(400, 'Product id is required');
  }

  const result = await Product.findByIdAndDelete(productId);

  if (!result) {
    throw new ApiError(404, 'Product not found');
  }

  return res
    .status(200)
    .json(new ApiResponse(200, result, 'Product deleted successfully'));
});

// update product images
const updateProductImages = asyncHandler(async (req, res) => {
  const { productId } = req.params;

  const images = [];

  if (
    req.files &&
    req.files[0]?.mimetype?.includes('image/') &&
    req.files[0]?.buffer
  ) {
    const imageOne = await await fileUploadOnCloudinary(req.files[0]?.buffer);
    if (imageOne) images.push(imageOne);
  }

  if (
    req.files &&
    req.files[1]?.mimetype?.includes('image/') &&
    req.files[1]?.buffer
  ) {
    const imageTwo = await await fileUploadOnCloudinary(req.files[1]?.buffer);
    if (imageTwo) images.push(imageTwo);
  }

  if (
    req.files &&
    req.files[2]?.mimetype?.includes('image/') &&
    req.files[2]?.buffer
  ) {
    const imageThree = await await fileUploadOnCloudinary(req.files[2]?.buffer);
    if (imageThree) images.push(imageThree);
  }

  const result = await Product.findByIdAndUpdate(
    productId,
    {
      images,
    },
    { new: true }
  );

  if (!result) {
    throw new ApiError(
      500,
      'Something went wrong when updating product images'
    );
  }

  return res
    .status(200)
    .json(new ApiResponse(200, result, 'Product images updated successfully'));
});

// update product offer price
const updateProductOfferPrice = asyncHandler(async (req, res) => {
  const { productId } = req.params;
  const { offerPrice } = req.body;

  if (!productId) {
    throw new ApiError(400, 'Product id required');
  }

  if (!offerPrice) {
    throw new ApiError(400, 'Offer price is required');
  }

  const result = await Product.findByIdAndUpdate(
    productId,
    { offerPrice },
    { new: true }
  );

  if (!result) {
    throw new ApiError(500, 'Something went wrong while updating offer price');
  }

  return res
    .status(200)
    .json(new ApiResponse(200, result, 'Offer price updated'));
});

// update product stock
const updateProductStock = asyncHandler(async (req, res) => {
  const { productId } = req.params;
  const { stocks } = req.body;

  if (!productId) {
    throw new ApiError(400, 'Product id required');
  }

  if (!stocks) {
    throw new ApiError(400, 'Product stock required');
  }

  const result = await Product.findByIdAndUpdate(
    productId,
    { stocks },
    { new: true }
  );

  if (!result) {
    throw new ApiError(500, 'Something went wrong updating the product stocks');
  }

  return res
    .status(200)
    .json(new ApiResponse(200, result, 'Stock updated successfully'));
});

// update product approval status by admin
const updateProductApproval = asyncHandler(async (req, res) => {
  const { productId } = req.params;
  const { approved } = req.body;

  if (!productId) {
    throw new ApiError(400, 'Product id required');
  }

  if (!approved) {
    throw new ApiError(400, 'Product stock required');
  }

  const result = await Product.findByIdAndUpdate(
    productId,
    { approved },
    { new: true }
  );

  if (!result) {
    throw new ApiError(
      500,
      'Something went wrong updating the product approval'
    );
  }

  return res
    .status(200)
    .json(new ApiResponse(200, result, 'Approval status updated successfully'));
});

// updateProduct without image
const updateProductWithoutImages = asyncHandler(async (req, res) => {
  const {
    name,
    subCategory,
    brand,
    price,
    offerPrice,
    purchasePrice,
    stocks,
    features,
    description,
    supplier,
  } = req.body;

  if (
    !(
      name?.trim() &&
      subCategory?.trim() &&
      brand?.trim() &&
      price &&
      purchasePrice &&
      features &&
      description?.trim() &&
      supplier?.trim()
    )
  ) {
    throw new ApiError(400, 'Required fields missing');
  }

  const { productId } = req.params;

  const result = await Product.findByIdAndUpdate(
    productId,
    {
      name,
      subCategory,
      brand,
      price,
      offerPrice,
      purchasePrice,
      stocks,
      features,
      description,
      supplier,
    },
    { new: true }
  );

  if (!result) {
    throw new ApiError(
      500,
      'Something went wrong updating the product approval'
    );
  }

  return res
    .status(200)
    .json(new ApiResponse(200, result, 'Product updated successfully'));
});

export {
  createProduct,
  deleteProduct,
  getAllProducts,
  getSingleProduct,
  updateProductApproval,
  updateProductImages,
  updateProductOfferPrice,
  updateProductStock,
  updateProductWithoutImages
};
