/* eslint-disable prettier/prettier */
import { Schema, model } from 'mongoose';

const brandSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        origin: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    },
);

const Brand = model('Brand', brandSchema);

export default Brand;
