const express = require("express");
const router = express.Router();
const User = require("../models/user.model");
const jwt = require("jsonwebtoken");

router.get("/", async (req, res) => {
  try {
    const data = await User.find();
    res.json({ users: data });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check if any required field is missing or empty
    if (!email || !password || !username) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check for duplicate user
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }

    // Create new user
    const newUser = await User.create({ username, email, password });

    const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "2h",
    });
    res.cookie("token", token, { httpOnly: true, maxAge: 2 * 60 * 60 * 1000 });
    res
      .status(201)
      .json({ message: "User created successfully", user: newUser });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// login route
router.post("/login", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check if any required field is missing or empty
    if (!email || !password || !username) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check for duplicate user
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(409).json({ message: "User does not exists" });
    }

    const isPasswordValid = await existingUser.comparePassword(password);
    if (!isPasswordValid) {
      return res.json({ message: "Password is incorrect" });
    }

    const token = jwt.sign({ userId: existingUser._id }, "shhh", {
      expiresIn: "2h",
    });
    res.cookie("token", token, { httpOnly: true, maxAge: 2 * 60 * 60 * 1000 }); // Set cookie with token

    res.json({ message: "User authenticated", userInfo: existingUser });
  } catch (error) {
    console.log(error);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const userData = await User.findById(id);
    res.json(userData);
  } catch (error) {
    console.log(error);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const userData = await User.findByIdAndUpdate(id, req.body);
    res.json(userData);
  } catch (error) {
    console.log(error);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const userData = await User.findByIdAndDelete(id);
    res.json(userData);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
