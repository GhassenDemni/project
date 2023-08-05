const express = require("express")
const modelpost = require('../models/post')
const usermodel = require('../models/user')
const bodyParser = require("body-parser")
const mongoose = require('mongoose')


const comntposte = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    res.status(400).json("Utilisateur not Existe !");
  }

  try {
      const commentaire = await modelpost.findByIdAndUpdate(id, {
        $push: {
          commentaire: {
            commentaireId: req.body.commentaireId,
            commentairepseudo: req.body.commentairepseudo,
            text: req.body.text,
            timestamp: new Date().getTime(),
          },
        },
      },{new:true}
      );

    if (!commentaire) {
      res.status(400).json({ message: "Problème - commentaire non ajouté !!" });
    }
    res.status(200).json(commentaire);
  } catch (error) {
    res.status(400).json(error);
  }
};



const updatecomment = async (req, res) => {
  const { id } = req.params;
  const { commentaireId, commentairepseudo, text } = req.body;

  try {
    if (!id) {
      return res.status(400).json("se Poste n'existe Pas error!");
    }

    const updatedComment = {
      commentaireId,
      commentairepseudo,
      text,
      timestamp: new Date().getTime(),
    };

    const updatedPost = await modelpost.findOneAndUpdate(
      { _id: id, "commentaire.commentaireId": commentaireId },
      { $set: { "commentaire.$": updatedComment } },
      { new: true }
    );

    if (!updatedPost) {
      return res.status(400).json("Commentaire non trouvé !");
    }

    res.status(200).json(updatedPost);
  } catch (error) {
    res.status(400).json(error);
  }
};

const deletecomment = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    res.status(400).json({ message: "poste not exists!!" });
  }

  try {
    const updatedPost = await modelpost.findByIdAndUpdate(
      id,
      {
        $pull: {   // est utilisé pour spécifier que vous souhaitez supprimer des éléments du tableau
          commentaire: {
            _id: req.body.commentaireId,
          },
        },
      },
      { new: true }
    );

    if (!updatedPost) {
      res.status(400).json("error de suppression !!");
    }

    res.status(200).json(updatedPost);
  } catch (error) {
    res.status(400).json(error);
  }
};


module.exports = {
    comntposte,
    updatecomment,
    deletecomment
}