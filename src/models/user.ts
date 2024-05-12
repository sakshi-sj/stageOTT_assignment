import mongoose, { Schema, Document } from 'mongoose';
import { Genre } from '../types/types';

export interface IUser extends Document {
  id: string;
  username: string;
  preferences: {
    favoriteGenres: Genre[];
    dislikedGenres: Genre[];
  };
  watchHistory: {
    contentId: string;
    watchedOn: Date;
    rating?: number;
  }[];
}

const userSchema: Schema = new Schema({
  id: { type: String, required: true },
  username: { type: String, required: true },
  preferences: {
    favoriteGenres: [{ type: String }],
    dislikedGenres: [{ type: String }],
  },
  watchHistory: [{
    contentId: { type: String, required: true },
    watchedOn: { type: Date, default: Date.now },
    rating: { type: Number },
  }],
});

const User = mongoose.model<IUser>('User', userSchema);

export default User;
