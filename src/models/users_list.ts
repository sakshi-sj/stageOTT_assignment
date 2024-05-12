import mongoose, { Schema, Document } from 'mongoose';

export interface IList extends Document {
  userId: mongoose.Types.ObjectId;
  items: string[];
}

const listSchema: Schema = new Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true },
  items: [{ type: mongoose.Schema.Types.ObjectId }],
});

const List = mongoose.model<IList>('List', listSchema);

export default List;
