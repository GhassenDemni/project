const express = require("express");
const mongoose = require("mongoose");
const db = require("../db/connect");
const bcrypt = require("bcrypt");
const bodyParser = require("body-parser");
const User = require("../models/user");
const session = require("express-session");
const jwt = require("jsonwebtoken");
const cookie = require("cookie-parser");
const handleSignUpErrors = require("../utils/error");

const createtoken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET);
};

const createUser = async (req, res) => {
  const { name, password, email, lastname, about, firstname, phone, adresse } =
    req.body;

  try {
    if (!name || !password || !email || !lastname) {
      return res.status(400).json({
        message:
          "Please enter required fields (name, password, email and lastname)",
      });
    }
    const checkemail = await User.findOne({ email: email });

    if (checkemail) {
      return res.json({ message: "Merci d'entrer un nouveaux email" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      lastname,
      about,
      firstname,
      phone,
      adresse,
    });
    const token = createtoken(user._id);

    res.status(201).json({
      message: `Welcome ${user.name} ${user.lastname}`,
      token: token,
    });
  } catch (error) {
    res.status(500).json({ message: error.message, error: error });
  }
};
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email:  email });
    if (!user) {
      return res
        .status(401)
        .json({ error: "merci de verifier votre Email ou mot de passe" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res
        .status(401)
        .json({ error: "merci de verifier votre Identité  " });
    }
    const token = createtoken(user._id);
    res.cookie("token", token, { httpOnly: true });
    res.status(200).json({ message: "Login successful" });
  } catch (error) {
    const errors = handleSignUpErrors(err);
    res.status(200).json({ errors });
  }
};

const logout = async (req, res) => {
  res.clearCookie("token");
  res.status(200).json({ message: "Logout successful" });
};

module.exports = {
  login,
  logout,
  createUser,
};
