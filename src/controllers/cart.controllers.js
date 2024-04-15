/* eslint-disable object-curly-newline */
import Cart from '../models/cart.model.js';
import { ApiError, ApiResponse, asyncHandler } from '../utils/index.js';

// create a new Cart
const createCart = asyncHandler(async (req, res) => {
    const { address, mobile, items } = req.body;

    if (!address || !mobile || !items?.length) {
        throw new ApiError(400, 'Required fields missing');
    }

    const cart = await Cart.create({
        user: req.user._id,
        address,
        mobile,
        items,
    });

    if (!cart) {
        throw new ApiError(500, 'Something went wrong creating the cart');
    }

    cart.calculateTotal();
    await cart.save();

    return res.status(201).json(new ApiResponse(201, cart, 'Card added successfully'));
});

// fetched all carts
const getAllCarts = asyncHandler(async (req, res) => {
    const carts = await Cart.find({});

    if (!carts) {
        throw new ApiError(500, 'Something went wrong when fetching cart');
    }

    return res.status(200).json(new ApiResponse(200, carts, 'Carts fetched successfully'));
});

// get pending carts
const pendingCarts = asyncHandler(async (req, res) => {
    const carts = await Cart.find({ status: 'pending' });

    if (!carts) {
        throw new ApiError(500, 'Something went wrong when fetching cart');
    }

    return res.status(200).json(new ApiResponse(200, carts, 'Carts fetched successfully'));
});

// cart status update
const cartStatusUpdate = asyncHandler(async (req, res) => {
    const { status, cartId } = req.body;

    if (!status) {
        throw new ApiError(400, 'Status required');
    }

    const result = await Cart.findByIdAndUpdate(cartId, { status }, { new: true });

    if (!result) {
        throw new ApiError(500, 'Something went wrong updating cart status');
    }

    return res.status(200).json(new ApiResponse(200, result, 'Cart status updated successfully'));
});

export { cartStatusUpdate, createCart, getAllCarts, pendingCarts };
