const bcrypt = require("bcrypt");
const { Router } = require("express");
const { toJWT } = require("../auth/jwt");
const authMiddleware = require("../auth/middleware");
const User = require("../models/").user;
const Spaces = require("../models").space;
const { SALT_ROUNDS } = require("../config/constants");
const Stories = require("../models").story;

const router = new Router();

router.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .send({ message: "Please provide both email and password" });
    }

    const user = await User.findOne({
      where: { email },
      include: {
        model: Spaces,
        attributes: ["title", "description", "backgroundColor", "color"],
        include: Stories,
      },
    });

    console.log("this is user", user);
    if (!user || !bcrypt.compareSync(password, user.password)) {
      return res.status(400).send({
        message: "User with that email not found or password incorrect",
      });
    }

    delete user.dataValues["password"]; // don't send back the password hash
    const token = toJWT({ userId: user.id });
    return res.status(200).send({ token, ...user.dataValues });
  } catch (error) {
    console.log(error);
    return res.status(400).send({ message: "Something went wrong, sorry" });
  }
});

router.post("/signup", async (req, res) => {
  const { email, password, name } = req.body;
  if (!email || !password || !name) {
    return res.status(400).send("Please provide an email, password and a name");
  }

  try {
    const newUser = await User.create({
      email,
      password: bcrypt.hashSync(password, SALT_ROUNDS),
      name,
    });

    const newSpace = await Spaces.create({
      title: `${newUser.name}'s space`,
      userId: newUser.id,
    });

    delete newUser.dataValues["password"]; // don't send back the password hash

    const token = toJWT({ userId: newUser.id });

    res.status(201).json({ token, ...newUser.dataValues });
  } catch (error) {
    if (error.name === "SequelizeUniqueConstraintError") {
      return res
        .status(400)
        .send({ message: "There is an existing account with this email" });
    }

    return res.status(400).send({ message: "Something went wrong, sorry" });
  }
});

// The /me endpoint can be used to:
// - get the users email & name using only their token
// - checking if a token is (still) valid
router.get("/me", authMiddleware, async (req, res, next) => {
  const id = req.user.id;
  delete req.user.dataValues["password"];

  try {
    const space = await Spaces.findOne({
      Model: Spaces,
      attributes: ["title", "id", "backgroundColor", "color"],
      where: { userId: id },
      include: {
        model: Stories,
        attributes: ["name", "content", "imageUrl", "id", "createdAt"],
      },
    });
    if (!space) {
      res.status(404).send("the space of this user not found");
      return;
    }
    res.send({ space: space, ...req.user.dataValues });
  } catch (e) {
    next(e);
  }
});

module.exports = router;

// router.get("/:userId", async (req, res, next) => {
//   const id = req.params.userId;
//   try {
//     const space = await Spaces.findOne({
//       Model: Spaces,
//       attributes: ["title", "id", "backgroundColor", "color"],
//       where: { userId: id },
//       include: {
//         model: Stories,
//         attributes: ["name", "content", "imageUrl", "id", "createdAt"],
//       },
//     });
//     if (!space) {
//       res.status(404).send("the space of this user not found");
//       return;
//     }
//     res.send(space);
//   } catch (e) {
//     next(e);
//   }
// });
