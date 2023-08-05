
const mongoose = require('mongoose')
const db = require('../db/connect')

const postshema = mongoose.Schema({
  posteID: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    trim: true,
    maxlength: 500,
  },
  image: {
    type: String,
  },
  video: {
    type: String,
  },
  likers: {
    type: [String],
    required: true,
  },
  commentaire: {
    type: [
      {
        commentaireId: String,
        commentairepseudo: String,
        text: String,
        timestamp: Number,
      },
    ],
    required: true,
  },
},
  { timestamp: true }
);

module.exports = mongoose.model("poste" , postshema)