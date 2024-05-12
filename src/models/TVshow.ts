import mongoose, { Schema, Document } from 'mongoose';
import { Genre } from '../types/types';

interface IEpisode {
  episodeNumber: number;
  seasonNumber: number;
  releaseDate: Date;
  director: string;
  actors: string[];
}

export interface ITVShow extends Document {
  id: string;
  title: string;
  description: string;
  genres: Genre[];
  episodes: IEpisode[];
}

const episodeSchema: Schema = new Schema({
  episodeNumber: { type: Number, required: true },
  seasonNumber: { type: Number, required: true },
  releaseDate: { type: Date, required: true },
  director: { type: String, required: true },
  actors: [{ type: String }],
});

const tvShowSchema: Schema = new Schema({
  id: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  genres: [{ type: String }],
  episodes: [episodeSchema],
});

const TVShow = mongoose.model<ITVShow>('TVShow', tvShowSchema);

export default TVShow;
