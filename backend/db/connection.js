import mongoose from "mongoose";
import "dotenv/config";

const connection = async () => {
  try {
    mongoose.connect(process.env.MONG0_DB_URI);
  } catch (err) {
    console.log(err);
  }
};

export default connection;
