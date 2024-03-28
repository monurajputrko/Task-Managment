import mongoose, { Schema } from "mongoose";

const userSchema = mongoose.Schema(
  {
    fullname: {
      type: String,
      lowercase: true,
      required: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    tasks: {
      type: [Schema.Types.ObjectId],
      ref: "Task",
      default: [],
    },
  }
);

export default mongoose.model("user", userSchema);
