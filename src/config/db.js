import mongoose from "mongoose";

export default async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Terhubung ke MongoDB:", mongoose.connection.name);
  } catch (error) {
    console.error("Gagal terhubung ke MongoDB:", error.message);
    process.exit(1);
  }
}