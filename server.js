// This is the entry point of our backend application.

const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const contactsRoutes = require("./routes/contacts");
const authRoutes = require("./routes/auth");
const authenticateToken = require("./middleware/auth");

const app = express();
const PORT = 3000;

// Middleware to parse JSON in request bodies
app.use(express.json());

// Serve static frontend files from the "public" folder
app.use(express.static("public"));

// Connect to MongoDB Atlas
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to MongoDB Atlas"))
  .catch((error) => console.error("MongoDB connection error:", error));

// Auth-related routes (public)
app.use("/auth", authRoutes);

// Contact-related routes (protected)
app.use("/contacts", authenticateToken, contactsRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});