const express = require("express");
const db = require("../db/connect");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

// created user and id user

const getUserById = async (req, res, next) => {
  const id = req.params.id;

  try {
    if (!id) {
      return res.status(400).json({ message: "Bellehy hot id" });
    }
    const userbyid = await User.findById(id);

    if (!userbyid) {
      res.status(404).json({ message: "User not found" });
    } else {
      res.status(200).json({ message: "User found", result: userbyid });
    }
  } catch (error) {
    return res.status(500).json({ message: error.mesage, error });
  }
};

//delete , update, search name , address , email , ,

const updateuser = async (req, res, next) => {

  const { id } = req.params
  const {  name, email, lastname, about } = req.body;

  try {
    if (!id) {
      return res.status(400).json({ mesage: "merci de verifier votre compte" });
    }

    const updateuser = await User.findByIdAndUpdate(id, {
      name,
      email,
      lastname,
      about,
    });

    if (!updateuser) {
      return res.status(400).json({
        message: " tu n'as rien changer merci de changer quelque chose ",
      });
    } else {
      res
        .status(200)
        .json({ message: "Update c'est bon ", result: updateuser });
    }
  } catch (error) {
    res.status(400).json({ message: error.mesage, error });
  }
};

const updatepassword = async (req, res, next) => {
  const { id, password, nwepassword } = req.body;
  try {
    if (!id) {
      res.status(400).json({ message: "merci de verifier votre compte" });
    }
    const user = await User.findById(id);
    if (!user) {
      res.status(400).json({ message: "Utilisateur non Trouvé" });
    }
    const paswordvalid = await bcrypt.compare(password, user.password);
    if (!paswordvalid) {
      res.status(400).json({ message: "merci de verifier votre mot de passe" });
    }
    const hashedPassword = await bcrypt.hash(nwepassword, 10);
    user.password = hashedPassword;
    await user.save();
    res.status(200).json({ message: "Mot de passe Modifier avec succés " });
  } catch (error) {
    res.status(500).json({ message: error.message, error });
  }
};

const deleteuser = async (req, res, next) => {
  const { id } = req.params.id;
  try {
    if (!id) {
      res.status(400).json({ message: "merci de verifier votre compte " });
    }
    const deleteuser = await User.findByIdAndDelete(id);
    if (!deleteuser) {
      return res.status(400).json({
        message: "tu est entrain de supprimer un user qui n'exsiste pas ",
      });
    } else {
      res.status(200).json({ message: "user delete c'est bon" });
    }
  } catch (error) {
    res.status(500).json({ message: error.mesage, error });
  }
};
 

const search = async (req, res) => {
  const query = req.body.query;

  try {
    const users = await User.find({
      $or: [
        { name: { $regex: query, $options: "i" } },
        { lastname: { $regex: query, $options: "i" } },
        { about: { $regex: query, $options: "i" } },
        { email: { $regex: query, $options: "i" } },
      ],
    }).select("name lastname about email");

    if (users.length === 0) {
      res
        .status(404)
        .json({ message: "Aucun utilisateur trouvé avec ces données" });
    } else {
      res.status(200).json({ message: users });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: error.message , error });
  }
};

module.exports = {
  getUserById,
  updateuser,
  deleteuser,
  updatepassword,
  search,
};
