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
        throw new ApiError(500, 'Something went wrong while creating product to the database');
    }

  return res
    .status(201)
    .json(new ApiResponse(201, product, 'Product saved successfully'));
});

export { createProduct };
