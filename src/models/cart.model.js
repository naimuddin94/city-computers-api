/* eslint-disable prettier/prettier */
import { Schema, model } from 'mongoose';

const cartSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    items: [
      {
        product: {
          type: Schema.Types.ObjectId,
          ref: 'Product',
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          default: 1, // Default quantity to 1
        },
        price: {
          type: Number,
          required: true,
        },
      },
    ],
    totalItems: {
      type: Number,
      default: 0,
    },
    totalPrice: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      enum: ['pending', 'shipped', 'delivered', 'cancelled', 'completed'],
      default: 'pending',
    },
  },
  {
    timestamps: true,
  },
);

cartSchema.methods.calculateTotal = function () {
    // Calculate total items and total price
    this.totalItems = this.items.reduce((total, item) => total + item.quantity, 0);
    this.totalPrice = this.items.reduce((total, item) => total + item.price * item.quantity, 0);
};

const Cart = model('Cart', cartSchema);

export default Cart;
