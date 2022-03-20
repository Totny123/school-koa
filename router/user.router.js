const Router = require("koa-router");

const { verifyAuth } = require("../middleware/auth.middleware");
const { getInfo } = require("../controller/user.controller");

const userRouter = new Router({ prefix: "/user" });

userRouter.get("/", verifyAuth, getInfo);

module.exports = userRouter;
