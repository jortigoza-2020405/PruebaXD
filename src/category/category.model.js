import { Schema, model } from 'mongoose';

const categorySchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'El nombre de la categoría es obligatorio'],
      trim: true,
      unique: true
    },
    description: {
      type: String,
      trim: true
    },
    hotel: {
      type: Schema.Types.ObjectId,
      ref: 'Hotel',
      required: false
    },
    rooms: [{
      type: Schema.Types.ObjectId,
      ref: 'Room'
    }],
    rating: {
      type: Number,
      min: 1,
      max: 5,
      default: 3
    }
  },
  { timestamps: true }
);

categorySchema.methods.toJSON = function () {
  const { __v, _id, ...category } = this.toObject();
  category.id = _id;
  return category;
};

export default model('Category', categorySchema);
