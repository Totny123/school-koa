const jwt = require("jsonwebtoken");

const {
  NAME_OR_PASSWORD_IS_EMPTY,
  PASSWORD_IS_WRONG,
  USER_IS_NOT_EXISTS,
  TOKEN_IS_WRONG,
} = require("../constants/error-types");
const { PUBLIC_KEY } = require("../app/config");
const md5password = require("../utils/password-handle");
const { getUserByName } = require("../service/auth.service");

const verifyLogin = async (ctx, next) => {
  //获取参数
  const { username: name, password, type } = ctx.request.body;
  //判断参数是否为空
  if (!name || !password || !type) {
    const error = new Error(NAME_OR_PASSWORD_IS_EMPTY);
    return ctx.app.emit("error", error, ctx);
  }
  //判断用户(sys_admin\admin\student)是否存在
  const tableName = ["", "sys_admin", "admin", "student"][Number(type)];
  const user = await getUserByName(tableName, name);
  if (!user) {
    const error = new Error(USER_IS_NOT_EXISTS);
    return ctx.app.emit("error", error, ctx);
  }
  //判断密码是否正确
  if (user.password !== md5password(password)) {
    const error = new Error(PASSWORD_IS_WRONG);
    return ctx.app.emit("error", error, ctx);
  }
  ctx.user = user;
  await next();
};

const verifyAuth = async (ctx, next) => {
  let token;
  if (ctx.query.token) {
    token = ctx.query.token;
  }
  if (ctx.headers["x-token"]) {
    token = ctx.headers["x-token"];
  }
  try {
    const result = jwt.verify(token, PUBLIC_KEY, {
      algorithms: ["RS256"],
    });
    ctx.user = result;
    await next();
  } catch (err) {
    const error = new Error(TOKEN_IS_WRONG);
    return ctx.app.emit("error", error, ctx);
  }
};

module.exports = {
  verifyLogin,
  verifyAuth,
};
