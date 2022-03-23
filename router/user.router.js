const Router = require("koa-router");

const { verifyAuth } = require("../middleware/auth.middleware");
const { getInfo, editPassword } = require("../controller/user.controller");

const userRouter = new Router({ prefix: "/user" });

userRouter.get("/", verifyAuth, getInfo);
userRouter.post("/editPassword", verifyAuth, editPassword);

module.exports = userRouter;
