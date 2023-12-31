import { Schema, Types, model } from 'mongoose';
import { IBooking, IBookingService } from './booking.interface';

const ServiceSchema = new Schema<IBookingService>({
  service: {
    type: String,
    required: true,
  },
  cleaningProduct: {
    type: Schema.Types.ObjectId,
    ref: 'CleaningProduct',
    required: true,
  },
  cleaningProductItem: {
    type: Number,
    required: true,
  },
});

const BookingSchema = new Schema<IBooking>({
  user: {
    type: Types.ObjectId,
    ref: 'User',
    required: true,
  },
  services: [ServiceSchema],
  grandPrice: {
    type: Number,
    required: true,
  },
  bookingDate: {
    type: Date,
    required: true,
  },
  deliveryDate: {
    type: Date,
    required: true,
  },
  isDelivered: {
    type: Boolean,
    default: false,
  },
});

export const Booking = model<IBooking>('Booking', BookingSchema);
