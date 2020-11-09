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
module.exports = router;
