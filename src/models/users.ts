import { Schema, model } from 'mongoose';


interface User {
  identity: string;
  name: string;
  email: string;
  phoneNumber: string;
  countryCode: string;
  dob: string,
  image: string,
  role: string;
  isPhoneVerified: boolean;
  isActive: boolean;
  isDelete: boolean;


}

const schema = new Schema<User>({
  identity: { type: String },
  name: { type: String, required: true },
  email: { type: String },
  phoneNumber: { type: String, required: true },
  countryCode: { type: String, required: true, default: '+91' },
  role: { type: String, required: true },
  isPhoneVerified: { type: Boolean, default: true },
  dob: { type: String, default: '' },
  image: { type: String, default: '' },
  isActive: { type: Boolean, default: true },
  isDelete: { type: Boolean, default: false },
}, {
  timestamps: true,
  versionKey: false
});
schema.index({ countryCode: 1, phoneNumber: 1, role: 1 }, { unique: true });

const userModel = model<User>('User', schema);
export = userModel
