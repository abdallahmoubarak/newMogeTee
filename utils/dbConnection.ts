import mongoose from "mongoose";
const uri: string = process.env.MONGO_URI || ""; //get the mongodb URI string from env variable
export default async () => {
  try {
    if (!uri) {
      throw new Error("MONGODB_URI is not defined in environment variables");
    }
    // if mongoose connected don't connect again
    if (mongoose.connections[0].readyState) {
      return;
    }
    await mongoose.connect(uri);
    console.log("Database connected successfully");
  } catch (error) {
    console.log(error);
  }
};
