import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Client from "../models/Client.js";

export const signup = async (req, res) => {
  const { name, gender, age, email, password } = req.body;

  try {
    const existingClient = await Client.findOne({ email });
    if (existingClient)
      return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newClient = new Client({
      name,
      gender,
      age,
      email,
      password: hashedPassword,
    });

    await newClient.save();

    const token = jwt.sign({ id: newClient._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.status(201).json({
      message: "Signup successful!",
      token,
      user: {
        id: newClient._id,
        name: newClient.name,
        email: newClient.email,
        gender: newClient.gender,
        age: newClient.age,
      },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingClient = await Client.findOne({ email });
    if (!existingClient)
      return res.status(404).json({ message: "Account not found" });

    const validPass = await bcrypt.compare(password, existingClient.password);
    if (!validPass)
      return res.status(401).json({ message: "Invalid password" });

    const token = jwt.sign({ id: existingClient._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.json({
      message: "Login successful",
      token,
      user: {
        id: existingClient._id,
        name: existingClient.name,
        email: existingClient.email,
        gender: existingClient.gender,
        age: existingClient.age,
      },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
