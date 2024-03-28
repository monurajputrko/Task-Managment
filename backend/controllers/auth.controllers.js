import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import User from "../models/user.model.js";


export const register = async (req, res) => {
  const { fullname, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(500).json({ error: "Email already Exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 5);

    const newUser = new User({ fullname, email, password: hashedPassword });

    const user = await newUser.save();

    const token = jwt.sign({ userId: user._id }, "shhhhh");
    const dataToSend = {
      email: user.email,
      fullname: user.fullname,
      tasks: user.tasks,
      token,
    };
    return res.status(200).json(dataToSend);
  } catch (error) {
    res
      .status(400)
      .json({ error: "User creation failed", message: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      return res.status(404).json({ error: "User not found!" });
    }

    bcrypt.compare(password, existingUser.password, (err, result) => {
      if (err) {
        return res
          .status(500)
          .json({ error: "Error occured while login, Please try again!" });
      }
      if (!result) {
        return res.status(403).json({ error: "Incorrect password!" });
      }

      const token = jwt.sign({ userId: existingUser._id }, "shhhhh");
      const dataToSend = {
        email: existingUser.email,
        fullname: existingUser.fullname,
        tasks: existingUser.tasks,
        token,
      };
      return res.status(200).json(dataToSend);
    });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Internal server error", message: error.message });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { fullname, email, password } = req.body;


    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      return res.status(404).json({ error: "User not found!" });
    }

    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10); // Example: 10 rounds of hashing
      existingUser.password = hashedPassword;
    }

    existingUser.email = email;
    existingUser.fullname = fullname;
    await existingUser.save();

    return res.status(200).json({
      msg: "User Updated Successfully!",
      fullname: existingUser.fullname,
      email: existingUser.email,
    });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Internal server error", message: error.message });
  }
};
