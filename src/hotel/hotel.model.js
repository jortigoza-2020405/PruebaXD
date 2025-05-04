import { Schema, model } from 'mongoose';

const hotelSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Hotel name is required'],
      trim: true
    },
    address: {
      type: String,
      trim: true
    },
    city: {
      type: String,
      trim: true
    },
    country: {
      type: String,
      trim: true
    },
    description: {
      type: String,
      trim: true
    },
    phone: {
      type: String,
      trim: true
    },
    email: {
      type: String,
      trim: true
    },
    amenities: [{ type: String, trim: true }],
    images: {
      type: String,
      trim: true
    },
    comments: [
      {
        user: { type: Schema.Types.ObjectId, ref: 'User' },
        comment: { type: String, trim: true },
        rating: { type: Number, min: 1, max: 5 }
      }
    ]
  },
  { timestamps: true }
);

hotelSchema.methods.toJSON = function () {
  const { __v, _id, ...hotel } = this.toObject();
  hotel.id = _id;
  return hotel;
};

export default model('Hotel', hotelSchema);

