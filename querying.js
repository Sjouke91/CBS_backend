const { user: User, space: Space, story: Story } = require("./models");

const getUsers = async () => {
  const users = await User.findAll({
    model: User,
    attributes: ["name"],
    include: { model: Space, attributes: ["description"] },
  });
  return users.map((user) => user.get({ plain: true }));
};

// getUsers().then((users) => console.log(users));

const getSpace = async (id) => {
  const space = await Space.findByPk(id, {
    model: Space,
    attributes: ["title"],
    include: { model: Story, attributes: ["name"] },
  });
  return space.get({ plain: true });
};

// getSpace(1).then((space) => console.log(space));
