import { Schema, Types, model } from 'mongoose';
import { IReview } from './review.interface';

const ReviewSchema = new Schema<IReview>({
  user: {
    type: Types.ObjectId,
    ref: 'User',
    required: true,
  },
  service: {
    type: Types.ObjectId,
    ref: 'Service',
    required: true,
  },
  review: {
    type: String,
    required: true,
  },
});

export const Review = model<IReview>('Review', ReviewSchema);
