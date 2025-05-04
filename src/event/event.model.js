import { Schema, model } from 'mongoose';

const eventSchema = new Schema(
  {
    hotel: {
      type: Schema.Types.ObjectId,
      ref: 'Hotel',
      required: true
    },
    name: {
      type: String,
      required: [true, 'Event name is required'],
      trim: true
    },
    description: {
      type: String,
      trim: true
    },
    startDate: Date,
    endDate: Date,
    resources: [
      {
        type: {
          type: String,
          trim: true
        },
        quantity: Number,
        price: Number
      }
    ],
    images: {
      type: String,
      trim: true
    }
  },
  { timestamps: true }
);

eventSchema.methods.toJSON = function() {
  const { __v, _id, ...evt } = this.toObject();
  evt.id = _id;
  return evt;
};

export default model('Event', eventSchema);