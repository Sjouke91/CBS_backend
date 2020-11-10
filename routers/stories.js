const { Router } = require("express");
// const authMiddleware = require("../auth/middleware");
const Stories = require("../models/").story;

const router = new Router();

router.get("/", async (req, res, next) => {
  try {
    const stories = await Stories.findAll({
      model: Stories,
      attributes: ["name", "content", "imageUrl", "spaceId"],
    });
    if (!stories) {
      res.send("no stories found");
      return;
    }
    res.send(stories);
  } catch (e) {
    next(e);
  }
});

router.delete("/:storyId", async (req, res, next) => {
  const storyId = req.params.storyId;
  console.log("this is id", storyId);
  try {
    const toDeleteStory = await Stories.findByPk(storyId);
    console.log("this is deleteStory", toDeleteStory);
    if (!toDeleteStory) {
      res.status(404).send("Story not found");
      return;
    }
    const deleted = await toDeleteStory.destroy();
    res.json(deleted);
  } catch (e) {
    next(e);
  }
});

module.exports = router;
