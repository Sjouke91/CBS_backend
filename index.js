const express = require("express");
const loggerMiddleWare = require("morgan");
const corsMiddleWare = require("cors");
const { PORT } = require("./config/constants");
const bodyParserMiddleWare = express.json();
const authRouter = require("./routers/auth");
const spaceRouter = require("./routers/spaces");
const userRouter = require("./routers/user");
const storyRouter = require("./routers/stories");
// const authMiddleWare = require("./auth/middleware");

const app = express();

//middlewares
app.use(loggerMiddleWare("dev"));
app.use(bodyParserMiddleWare);
app.use(corsMiddleWare());
if (process.env.DELAY) {
  app.use((req, res, next) => {
    setTimeout(() => next(), parseInt(process.env.DELAY));
  });
}

//routers
app.use("/user", userRouter);
app.use("/", authRouter);
app.use("/spaces", spaceRouter);
app.use("/stories", storyRouter);

//listening on port
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
