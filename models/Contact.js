//This file defines  the schema for the Contact model using Mongoose, which is used to interact with the MongoDB database.

const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
        trim: true,
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        trim: true,
        lowercase: true,
        match:[/^\S+@\S+\.\S+$/, "Invalid email format"],
    },
    phone:{
        type: String,
        required: [true, "Phone number is required"],
        trim: true,
    },
    category: {
        type: String,
        enum: ["personal","work"],
        default: "personal",
    },
}, {
    timestamps: true,
});

module.exports = mongoose.model("Contact", contactSchema);