const { Router } = require("express");
// const authMiddleware = require("../auth/middleware");
const Spaces = require("../models").space;
const Stories = require("../models").story;
const authMiddleware = require("../auth/middleware");

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

router.post("/:spaceId/stories", async (req, res, next) => {
  const spaceId = req.params.spaceId;
  const { name, content, imageUrl } = req.body;
  if (!name || !content || !imageUrl) {
    res.status(404).send("missing information");
    return;
  }
  try {
    const newPost = await Stories.create({ name, content, imageUrl, spaceId });
    console.log(newPost);
    res.send(newPost);
  } catch (e) {
    next(e);
  }
});

router.patch("/:id", authMiddleware, async (req, res) => {
  const id = req.params.id;
  console.log(id);
  const space = await Spaces.findByPk(req.params.id);
  console.log(space);
  if (!space.userId === id) {
    return res
      .status(403)
      .send({ message: "You are not authorized to update this space" });
  }

  const { title, description, backgroundColor, color } = req.body;

  await space.update({ title, description, backgroundColor, color });

  return res.status(200).send({ space });
});

module.exports = router;
