import { Schema, model } from 'mongoose';

const reservationSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    hotel: {
      type: Schema.Types.ObjectId,
      ref: 'Hotel',
      required: true
    },
    room: {
      type: Schema.Types.ObjectId,
      ref: 'Room',
      required: true
    },
    startDate: {
      type: Date,
      required: true
    },
    endDate: {
      type: Date,
      required: true
    },
    status: {
      type: String,
      enum: ['PENDING','CONFIRMED','CANCELLED'],
      default: 'PENDING'
    }
  },
  { timestamps: true }
);

reservationSchema.methods.toJSON = function() {
  const { __v, _id, ...res } = this.toObject();
  res.id = _id;
  return res;
};

export default model('Reservation', reservationSchema);