const jwt = require("jsonwebtoken");
const User = require("../models/user");

// const { model } = require("mongoose");
const checkUser = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  try {
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Token invalid" });
    }

    const token = authHeader.split(" ")[1];

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decodedToken.id);

    if (!user)
      return res.status(400).json({
        message: "Utilisateur non trouvé. Veuillez cré compte.",
      });

    req.user = decodedToken;
    next();
  } catch (error) {
    res.status(401).json({ error: "Token invalide" });
  }
};

module.exports = checkUser;
