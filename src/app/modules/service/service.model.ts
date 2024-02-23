import { Schema, model } from 'mongoose';
import { IService } from './service.interface';

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
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  },
);

export const Service = model<IService>('Service', ServiceSchema);
