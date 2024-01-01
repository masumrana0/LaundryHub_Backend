import { Schema, Types, model } from 'mongoose';
import { IReview, IService } from './service.interface';

const ReviewSchema = new Schema<IReview>({
  user: {
    type: Types.ObjectId,
    ref: 'User',
    required: true,
  },
  review: {
    type: String,
    required: true,
  },
});

const ServiceSchema = new Schema<IService>(
  {
    title: {
      type: String,
      required: true,
    },
    images: [
      {
        type: String,
        required: true,
      },
    ],
    details: [
      {
        type: String,
        required: true,
      },
    ],
    reviews: [ReviewSchema],
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  },
);

export const Service = model<IService>('Service', ServiceSchema);
export const Review = model<IReview>('review', ReviewSchema);
