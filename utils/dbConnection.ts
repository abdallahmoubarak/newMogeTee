import mongoose from "mongoose";

async function dbConnection() {
  if (mongoose.connections[0].readyState) return;

  const mongoUri = process.env.MONGO_URI;
  if (!mongoUri) {
    console.error("MONGO_URI is not defined");
    return;
  }

  await mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  } as mongoose.ConnectOptions);

  console.log("connected");
}

export default dbConnection;
