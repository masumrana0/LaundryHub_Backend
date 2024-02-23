/**
 * Title: 'CleaningProduct Schema'
 * Description: ''
 * Author: 'Masum Rana'
 * Date: 30-12-2023
 *
 */

import mongoose, { Schema } from 'mongoose';
import { ICleaningProduct } from './cleaningProduct.interface';
import { cleaningProductCategory } from './cleaningProduct.constant';

// Create a Mongoose schema for CleaningProduct
const cleaningProductSchema = new Schema<ICleaningProduct>(
  {
    category: {
      type: String,
      enum: cleaningProductCategory,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  },
);

// Define and export the Mongoose model
export const CleaningProduct = mongoose.model<ICleaningProduct>(
  'CleaningProduct',
  cleaningProductSchema,
);
