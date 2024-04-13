/* eslint-disable prettier/prettier */
import { Schema, model } from 'mongoose';

const supplierSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    address: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true },
);

const Supplier = model('Supplier', supplierSchema);

export default Supplier;
