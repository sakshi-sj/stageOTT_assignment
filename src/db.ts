import mongoose from "mongoose";

const mongoURI: string = 'mongodb+srv://sakshi:3yrOnjYmpLA8Aabn@cluster0.em9exsd.mongodb.net/stageott?retryWrites=true&w=majority&appName=Cluster0/'

export const connectMongo = async () => {
  try {
    await mongoose.connect(mongoURI, {})
    console.log('MongoDB connected')
  } catch (error) {
    console.error(error);
  }
}

