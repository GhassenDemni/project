const express = require("express");
const postmodel = require("../models/post");
const usermodel = require("../models/user");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const multer = require("multer");
const path = require("path");

const readpost = async (req, res) => {
  try {
    const checkpost = await postmodel.find();
    if (checkpost.length === 0) {
      return res.status(404).json({ message: "Il n'y a aucun modèle de post" });
    } else {
      res.status(200).json(checkpost);
    }
  } catch (err) {
    res.status(400).send(err);
  }
};

const createpost = async (req, res) => {

  const { posteID, message, image, video, likers, commentaire } = req.body;
  try {
      if (
        req.file.mimetype !== "image/jpg" &&
        req.file.mimetype !== "image/png" &&
        req.file.mimetype !== "image/jpeg"
      ) {
        return res.status(400).json("Merci d'ajouter une Images");
      }
      if (req.file &&  req.file.size > 500000) {
        return res
          .status(400)
          .json("Error: The file size is too large (max size is 500000)");
    }
       
    const nwePost = new postmodel({
      posteID,
      message,
      image  ,
      video,
      likers,
      commentaire,
    });
    const post = await nwePost.save();
    return res.status(201).json(post);
  } catch (error) {
    res.status(400).send(error);
  }
};

const updateposte = async (req, res) => {
  const { id } = req.params;
  const { message } = req.body;
  try {
    if (!id) {
      res.status(400).send(`Cet utilisateur n'existe pas avec cet ID : ${id}`);
    }
    const updatemsg = await postmodel.findByIdAndUpdate(id, { message });
    if (!updatemsg) {
      res.status(400).json({ message: "Votre message n'a pas été modifié !" });
    } else {
      res.status(200).json({ updatemsg });
    }
  } catch (error) {
    res.status(400).json({ error });
  }
};
const deletepost = async (req, res) => {
  const { id } = req.params;
  const { message } = req.body;
  try {
    if (!id) {
      res.status(400).json({ message: "Utilisateur nos Trouveé !! " });
    }
    const deleteposte = await postmodel.findByIdAndDelete(id, {
      message,
    });
    if (!deleteposte) {
      res.status(400).json({ message: "Votre message n'a pas été Supprimé !" });
    } else {
      res.status(200).json({ deleteposte });
    }
  } catch (error) {
    res.status(400).json({ error });
  }
};

const likeposte = async (req, res) => {
  const { id } = req.params;

  try {
    if (!id) {
      return res.status(400).json({ message: "Utilisateur non trouvé" });
    }

    const updatedPost = await postmodel.findByIdAndUpdate(
      id,
      { $addToSet: { likers: req.body.id } },
      { new: true }
    );

    const updateUser = await usermodel.findByIdAndUpdate(
      req.body.id,
      { $addToSet: { likes: id } }, // Utilisation de $addToSet pour ajouter l'ID sans doublon si on utilise push chaque clique il va ajouter une fois j'aime aux tableaux on va avoire la des doublon

      { new: true }
    );

    if (!updatedPost || !updateUser) {
      return res.status(404).json({ message: "Publication introuvable" });
    }

    res.status(200).json({ updatedPost, updateUser });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Erreur serveur lors du traitement de la requête" });
  }
};
const nolikeposte = async (req, res) => {
  const { id } = req.params;

  try {
    if (!id) {
      return res.status(400).json({ message: "Utilisateur non trouvé" });
    }

    const updatedPost = await postmodel.findByIdAndUpdate(
      id,
      { $pull: { likers: req.body.id } }, // pour supprimer le like d'ou id de user disparait le like sisparait le like se fait a travers id du user

      { new: true }
    );

    const updateUser = await usermodel.findByIdAndUpdate(
      req.body.id,
      { $pull: { likes: id } }, // pour supprimer le like d'ou id de user disparait le like sisparait le like se fait a travers id du user 

      { new: true }
    );

    if (!updatedPost || !updateUser) {
      return res.status(404).json({ message: "Publication introuvable" });
    }

    res.status(200).json({ updatedPost, updateUser });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Erreur serveur lors du traitement de la requête" });
  }
};



module.exports = {
  createpost,
  readpost,
  updateposte,
  deletepost,
  likeposte,
  nolikeposte,
};
