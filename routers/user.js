const { Router } = require("express");
const authMiddleware = require("../auth/middleware");
// const User = require("../models/").user;
const Spaces = require("../models").space;

const router = new Router();

router.get("/", authMiddleware, async (req, res, next) => {
  const userId = req.user.id;

  try {
    const space = await Spaces.findOne({ where: { userId: userId } });
    if (!space) {
      res.status(404).send("the space of this user not found");
      return;
    }
    res.send(space);
  } catch (e) {
    next(e);
  }
});

module.exports = router;
