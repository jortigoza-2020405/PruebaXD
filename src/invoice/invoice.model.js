import { Schema, model } from 'mongoose';

const invoiceSchema = new Schema(
  {
    reservation: {
      type: Schema.Types.ObjectId,
      ref: 'Reservation',
      required: true
    },
    items: [
      {
        description: String,
        price: Number
      }
    ],
    total: Number
  },
  { timestamps: true }
);

invoiceSchema.methods.toJSON = function () {
  const { __v, _id, ...inv } = this.toObject();
  inv.id = _id;
  return inv;
};

export default model('Invoice', invoiceSchema);
