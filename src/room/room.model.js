import { Schema, model } from 'mongoose';

const roomSchema = new Schema(
  {
    roomNumber: {
      type: String,
      required: [true, 'Room number is required'],
      trim: true
    },
    roomType: {
      type: String,
      required: [true, 'Room type is required'],
      trim: true
    },
    capacity: {
      type: Number,
      required: [true, 'Capacity is required']
    },
    pricePerNight: {
      type: Number,
      required: [true, 'Price per night is required']
    },
    status: {
      type: String,
      enum: ['AVAILABLE','OCCUPIED','RESERVED','MAINTENANCE'],
      default: 'AVAILABLE'
    },
    description: {
      type: String,
      trim: true
    },
    services: {
      type: String,
      trim: true
    },
    images: {
      type: String,
      trim: true
    },
    hotel: {
      type: Schema.Types.ObjectId,
      ref: 'Hotel',
      required: true
    },
    comments: [
      {
        user: {
          type: Schema.Types.ObjectId,
          ref: 'User',
          default: null
        },
        comment: {
          type: String,
          required: true
        },
        rating: {
          type: Number,
          min: 1,
          max: 5
        }
      }
    ]
  },
  { timestamps: true }
);

roomSchema.methods.toJSON = function() {
  const { __v, _id, ...room } = this.toObject();
  room.id = _id;
  return room;
};

export default model('Room', roomSchema);
