import { Schema, model } from 'mongoose';

const userSchema = new Schema({
  firebaseUid: {
    type: String,
    required: false,
    unique: false
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minLength: [8, 'Password must be 8 characters'],
    maxLength: [100, `Can't be overcome 100 characters`],
  },
  firstName: {
    type: String,
    default: ''
  },
  lastName: {
    type: String,
    default: ''
  },
  role: {
    type: String,
    enum: ['cliente','adminHotel','adminPlataforma'],
    default: 'cliente'
  },
  photoUrl: {
    type: String,
    default: ''
  }
}, { timestamps: true });

userSchema.methods.toJSON = function() {
  const { __v, _id, ...user } = this.toObject();
  user.id = _id;
  return user;
};

export default model('User', userSchema);
