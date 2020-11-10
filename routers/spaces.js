const { Router } = require("express");
// const authMiddleware = require("../auth/middleware");
const Spaces = require("../models").space;
const Stories = require("../models").story;

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
    res.send(space);
  } catch (e) {
    next(e);
  }
});

module.exports = router;
