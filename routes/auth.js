// This file defines the authentication endpoints for user resgistration and login.

const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

// POST/auth/register - create a new user
router.post("/register", async (req, res) => {
  try {
    const { email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ email, password: hashedPassword });
    const savedUser = await newUser.save();

    res.status(201).json({ id: savedUser._id, email: savedUser.email });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// POST /auth/login - authenticate a user and return a token
router.post("/login", async(req,res) => {
    try{
        const { email, password} =  req.body;

        const user = await User.findOne({ email });
        if (!user){
            return res.status(401).json({ error: "Invalid email or password"});
        }

        const passwordMatches = await bcrypt.compare(password, user.password);
        if (!passwordMatches) {
            return res.status(401).json({ error: "Invalid email or password"});
        }

        const token = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "1h"}
        );
        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;

