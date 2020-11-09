const { Router } = require("express");
// const authMiddleware = require("../auth/middleware");
const Spaces = require("../models").space;

const router = new Router();

router.get("/", async (req, res, next) => {
  try {
    const spacesName = await Spaces.findAll({
      model: Spaces,
      attributes: [
        "title",
        "description",
        "backgroundColor",
        "color",
        "userId",
      ],
    });
    if (!spacesName) {
      res.status(404).send("no spaces found");
      return;
    }
    res.send(spacesName);
  } catch (e) {
    next(e);
  }
});

router.get("/:userId", async (req, res, next) => {
  const id = req.params.userId;
  try {
    const space = await Spaces.findOne({ where: { userId: id } });
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
