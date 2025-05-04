import { Schema, model } from 'mongoose';

const paymentSchema = new Schema(
  {
    reservation: {
      type: Schema.Types.ObjectId,
      ref: 'Reservation',
      required: true
    },
    amount: {
      type: Number,
      required: true
    },
    method: {
      type: String,
      enum: ['CARD','CASH','TRANSFER'],
      default: 'CARD'
    },
    status: {
      type: String,
      enum: ['SUCCESS','PENDING','FAILED'],
      default: 'PENDING'
    }
  },
  { timestamps: true }
);

paymentSchema.methods.toJSON = function() {
  const { __v, _id, ...pay } = this.toObject();
  pay.id = _id;
  return pay;
};

export default model('Payment', paymentSchema);
