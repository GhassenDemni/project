const multer = require("multer");
const path = require("path");
const usermodel = require("../models/user");
// const fs = require("fs"); // créé des fichiers, ajoute des fichiers, renomme des fichiers (système de fichiers)

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../images")); // path tri9 lel faulder mta image tri9 eli chihezna lel folder image
  },
  filename: function (req, file, cb) {
    cb(null, new Date().toISOString().replace(/:/g, "-") + file.originalname);
  },
});

const upload = multer({ storage: storage });

// 1) enregistrer les images qui viennent des clients dans le dossier "images"
const uploadprofile = async (req, res) => {
  const { id } = req.body;
  try {
    if (
      req.file.mimetype !== "image/jpg" &&
      req.file.mimetype !== "image/png" &&
      req.file.mimetype !== "image/jpeg"
    ) {
      return res.status(400).json("Invalid Image");
    }
    if (req.file.size > 500000) {
      return res
        .status(400)
        .json("Error: The file size is too large (max size is 500000)");
    }

    const useruplouad = await usermodel.findByIdAndUpdate(
      id,
      { $set: { image: "./images" } },
      { new: true }
    );
    res.status(200).json(useruplouad);
  } catch (error) {
    res.status(400).json(error);
  }
};

module.exports = {
  upload,
  uploadprofile,
};
