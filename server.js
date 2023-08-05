const express = require("express");
const app = express();
const userRouter = require("./routes/users");
const authRouter = require("./routes/auth");
const uploadimages = require('./routes/uplouad')
const db = require("./db/connect");
require("dotenv").config();
const cookie = require("cookie-parser");

const PORT = process.env.PORT || 5000;
const bodyParser = require("body-parser");
const checkUser = require("./middleware/authentification");
const posteRouter = require("./routes/post")
const postecomntRouter = require("./routes/postcomment")
app.use(express.json({ limit: "20mb" }));
app.use(cookie());
app.use(bodyParser.json());


app.get('*', checkUser)

app.use("/upload", uploadimages);

app.use("/api/users",  userRouter);

app.use("/api/auth", authRouter);

app.use("/post", posteRouter);

app.use("/postcomment", postecomntRouter);



const start = async () => {
  await db();
  app.listen(PORT, () => {
    console.log(`Server is listening on Port ${PORT}`);
  });
};

start();















// const express = require("express");
// const app = express();
// const userRouter = require("./routes/users");
// const authRouter = require("./routes/auth");
// const uploadimages = require("./routes/uplouad");
// const db = require("./db/connect");
// require("dotenv").config();
// const cookie = require("cookie-parser");
// const PORT = process.env.PORT || 5000;
// const bodyParser = require("body-parser");
// const checkUser = require("./middleware/authentification");
// const posteRouter = require("./routes/post");
// const postecomntRouter = require("./routes/postcomment");
// app.use(express.json({ limit: "20mb" }));
// app.use(cookie());
// app.use(bodyParser.json());

// app.use("/upload", uploadimages);

// app.get("*", checkUser); // Déplacez cette ligne après l'importation du middleware "authentification"

// app.use("/api/users", userRouter);

// app.use("/api/auth", authRouter);

// app.use("/post", posteRouter);

// app.use("/postcomment", postecomntRouter);

// const start = async () => {
//   await db();
//   app.listen(PORT, () => {
//     console.log(`Server is listening on Port ${PORT}`);
//   });
// };

// start();