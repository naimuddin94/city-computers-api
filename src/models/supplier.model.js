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
    products: {
      type: [Schema.Types.ObjectId],
      ref: 'Product',
      required: true,
    },
  },
  { timestamps: true },
);

const Supplier = model('Supplier', supplierSchema);

export default Supplier;
