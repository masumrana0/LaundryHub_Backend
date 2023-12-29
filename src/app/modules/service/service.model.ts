import { Schema, model } from 'mongoose';
import { IService } from './service.interface';

const ServiceSchema = new Schema<IService>({
  title: { type: String, required: true },
  img: { type: String, required: true },
  details: [{ type: String }],
  reviews: [
    {
      name: { type: String, required: true },
      review: { type: String, required: true },
    },
  ],
});

export const Service = model<IService>('Service', ServiceSchema);
