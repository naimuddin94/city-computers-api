/* eslint-disable prettier/prettier */
import { Schema, model } from 'mongoose';

const userSchema = new Schema(
  {
    fullName: {
      type: String,
      required: [true, 'Name is required'],
      minlength: [3, 'Full name must be at least 3 characters long'],
      maxlength: [50, 'Full name cannot exceed 50 characters'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: [true, 'Email is already exists'],
    },
    image: {
      type: String,
      required: [true, 'Image is required'],
    },
    role: {
      type: String,
      enum: ['admin', 'manager', 'operator', 'basic'],
      default: 'basic',
    },
  },
  {
    timestamps: true,
  },
);

const User = model('User', userSchema);

export default User;
