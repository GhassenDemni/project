const express = require("express");
const mongoose = require("mongoose");
const { isEmail } = require("validator");
const db = require("../db/connect");

const usershema = mongoose.Schema({
  folllowers: {
    type: [String],
  },
  following: {
    type: [String],
  },
  likes: {
    type: [String],
  },
  image: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    minLength: [6, ""],
    maxLength: [255, "az"],
    unique: [true, "Email is already exist."],
    trim: true,
    validate: [isEmail, "Please enter a valid email address."],
  },
  password: {
    type: String,
    required: true,
    minLength: 6,
    maxLength: 60,
    trim: true,
  },
  name: {
    required: true,
    type: String,
    maxLength: 30,
    minLength: 3,
    trim: true,
  },

  firstname: {
    type: String,
    required: true,
    minLength: [3, "First name must have at least 3 characters."],
    maxLength: [30, "First name can have at most 30 characters."],
    trim: true,
  },
  lastname: {
    required: true,
    type: String,
    maxLength: 30,
    minLength: 3,
    trim: true,
  },

  about: {
    type: String,
    trim: true,
  },
  bio: {
    type: String,
    maxLength: 1024,
  },
  adresse: [
    {
      ville: {
        required: true,
        type: String,
        minLength: [3, "Address must have at least 3 characters."],
        maxLength: [20, "Address can have at most 20 characters."],
      },

      codepostale: { type: Number },
    },
  ],

  phone: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
    default: "USER",
  },
});

module.exports = mongoose.model("User", usershema);
