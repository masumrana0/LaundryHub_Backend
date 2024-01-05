import { Schema, Types, model } from 'mongoose';
import { IRating, IService } from './service.interface';

const RatingSchema = new Schema<IRating>({
  user: {
    type: Types.ObjectId,
    ref: 'User',
    required: true,
  },
  rating: {
    type: Number,
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

    rating: [RatingSchema],
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  },
);

export const Service = model<IService>('Service', ServiceSchema);

export const Rating = model<IRating>('ratings', RatingSchema);
